---
sidebar_position: 11
title: Type checking
---

# Type checking

`luau2ts` ships two opt-in type checkers that catch semantic errors before you ever run the emitted code. They sit at opposite ends of the translation pipeline so they cover different bug classes.

## The two layers

```
   Luau source
       │
       ▼
   ┌─────────────────────┐
   │ Luau parser         │
   └─────────────────────┘
       │
       ▼
   [optional] Luau.Analysis   ← Layer B (pre-emit, --check-luau)
       │
       ▼
   ┌─────────────────────┐
   │ compile (emit)      │
   └─────────────────────┘
       │
       ▼
   [optional] tsc            ← Layer A (post-emit, --check-ts)
       │
       ▼
   CompileResult { source, errors[] }
```

### Layer A: post-emit TypeScript check

Runs TypeScript's compiler API on the emitted `.ts` source. Catches type errors that survive translation: a typed Luau local with a wrong-type initializer, a missing macro that left an untyped call site, anything where the emitted TS is itself ill-typed.

No extra install required; `luau2ts` already bundles `typescript`.

### Layer B: pre-emit Luau check

Runs Luau's official type checker (`Luau.Analysis`, compiled to WASM) on the input Luau before translation. Catches errors at the source language: assignment-of-wrong-type, undeclared globals, function-arity mismatches.

Ships as a separate package, `@luau2ts/analyzer`, that you install when you want it. The luau2ts core stays small for users who don't.

> **Status**: Layer A is live now. Layer B currently emits a soft notice; the analyzer package is in development.

## CLI flags

```bash
luau2ts foo.luau --check-ts        # Layer A only
luau2ts foo.luau --check-luau      # Layer B only (will warn until @luau2ts/analyzer lands)
luau2ts foo.luau --typecheck       # both layers
```

Diagnostics print to stderr in `path:line:col: [source:code] message` format and the process exits non-zero if any are surfaced. The compiled `.ts` still goes to stdout / the `-o` target even when checks fail, so an editor can show partial output.

Example:

```bash
$ echo 'local x: number = "hi"' > bad.luau
$ luau2ts bad.luau --typecheck
bad.luau:3:5: [ts:2322] Type 'string' is not assignable to type 'number'.
bad.luau:0:0: [luau2ts] preEmitCheck (Luau-side type check) requires @luau2ts/analyzer, which is not yet published.
// Compiled by luau2ts v0.1.0 (do not edit).

let x: number = 'hi';
$ echo $?
1
```

## Library API

```ts
import { compile } from 'luau2ts';

// Layer A only
const a = await compile(source, { postEmitCheck: true });

// Layer B only (no-ops with a soft warning until @luau2ts/analyzer is published)
const b = await compile(source, { preEmitCheck: true });

// Both
const c = await compile(source, { typeCheck: true });

// Errors land in result.errors with [ts:CODE] or [luau:CODE] prefix
for (const err of c.errors) {
  console.log(`${err.loc.start.line}:${err.loc.start.col} ${err.message}`);
}
```

## Diagnostic source tags

Every entry in `CompileResult.errors` carries a one-word source tag in its `message` so downstream tooling can filter or colorize:

| Tag | Source |
|---|---|
| `[parser]` | Parser errors (always on) |
| `[ts:CODE]` | Layer A (TypeScript compiler, numeric TS error code) |
| `[luau:CODE]` | Layer B (Luau analyzer, symbolic code like `TypeMismatch`) |

The structural shape is the same for all: `{ message, loc: { start: { line, col }, end: { line, col } } }`.

## Why two layers?

A and B catch genuinely different things.

**Layer A** validates the **output**. It sees what the compiler emitted and checks it against TypeScript's rules. It catches things like:

- `let x: number = 'hi'` (typed Luau initializer that didn't survive translation cleanly)
- `arr.length` used where roblox-ts expects `.size()` (compatibility-mode bugs)
- a macro left an untyped call site that TS can't reconcile

**Layer B** validates the **input**. It sees the original Luau before translation, with all its native semantics. It catches things like:

- `local x: number = "hi"` (translation will succeed but the input was wrong)
- calling a 2-arg function with 3 args
- using a deprecated API the Luau team flagged

Running both is roblox-ts's developer experience: errors surface immediately at whichever end of the pipe they originated. Most users want `--typecheck` and forget the individual flags.

## Strictness

Layer A runs with `strict: false` by default because Luau code that omits annotations translates to `any`-typed TS positions, and a strict check would drown the user in noise. If your project annotates everything and you want the full strict pass, run `tsc --strict` on the emitted directory yourself:

```bash
luau2ts src/ -o out/ --check-ts
tsc --strict --noEmit out/**/*.ts
```
