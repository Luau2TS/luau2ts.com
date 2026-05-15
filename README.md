# luau2ts.com

The Docusaurus site for [luau2ts](https://github.com/luau2ts/luau2ts), live at **[luau2ts.com](https://luau2ts.com)**.

## Local development

Clone this repo *next to* the main `luau2ts` repo, so the layout is:

```
projects/
├── luau2ts/        # the compiler
└── luau2ts.com/    # this repo
```

Then:

```bash
pnpm install
pnpm start
```

The site links the local `luau2ts` package via `link:../luau2ts`, so the playground compiles against the in-tree compiler. Run `pnpm --filter luau2ts build` first if you want the linked dist to be up to date.

## Build

```bash
pnpm build
```

Produces a static site under `build/`.

## Where things live

- `docs/` — Markdown content (intro, quick-start, setup-guide, usage, API, FAQ, Guides)
- `src/pages/index.tsx` — landing page
- `src/pages/playground/` — live Luau→TypeScript compiler
- `static/img/` — logo and other assets
- `docusaurus.config.ts` — Docusaurus configuration

## License

[MIT](./LICENSE) © Tony Bolivar
