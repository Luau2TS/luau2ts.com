---
sidebar_position: 3
title: Formatting the emitted TypeScript
---

# Formatting the emitted TypeScript

`luau2ts` pipes its output through [Prettier](https://prettier.io) before returning it, so what you get is already canonically formatted: 2-space indent, single quotes, trailing commas, 100-column print width. No second formatting pass is required for the output to read like hand-written TypeScript.

## Pretty by default

The library API uses `pretty: true` by default. The CLI does the same. Disabling Prettier is a single option:

```ts
import { compile } from 'luau2ts';

const r = await compile(source, { pretty: false });
// Raw TypeScript-printer output: 4-space indent, double quotes.
```

You might want `pretty: false` for build pipelines that already run their own formatter, for snapshot tests, or to shave a few milliseconds off bulk compilation. Otherwise leave it on.

## Adjusting the style

The Prettier rules are baked in to match the broader `rbx-web` / `roblox-ts` ecosystem. If your project uses a different style, the right call is to re-run your own formatter on the output directory:

```bash
luau2ts src/ -o out/
pnpm exec prettier --write out/         # your own .prettierrc takes over
# or
pnpm exec biome format --write out/
```

Prettier and Biome both preserve the `// Compiled by luau2ts vX.Y.Z (do not edit).` header.

## Why bake in formatting at all?

The TypeScript factory API produces correct but unreadable code: 4-space indent, no blank lines between top-level blocks, no canonical quote choice. Most users would run Prettier on the output anyway, so it ships pre-formatted. If your codebase has a stricter style, run your own formatter after `luau2ts` and you get the same end result.
