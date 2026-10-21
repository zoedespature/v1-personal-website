<h1 align="center">
  zoedespature.com - v1
</h1>
<p align="center">
  Built with <a href="https://www.gatsbyjs.org/" target="_blank">Gatsby</a> and hosted with <a href="https://www.netlify.com/" target="_blank">Netlify</a>
</p>
<p align="center">
  <a href="https://app.netlify.com/sites/regal-salamander-52b40f/deploys" target="_blank">
    <img src="https://api.netlify.com/api/v1/badges/ce95de5f-c42b-4899-a70e-c4d8444d99eb/deploy-status" alt="Netlify Status" />
  </a>
</p>

## 🚨 Using this code (please read!)

This website has been forked from [Brittany Chiang's](https://github.com/bchiang7/v4) incredible work. Please give her proper credit by linking back to [brittanychiang.com](https://brittanychiang.com).

## 🛠 Installation & Set Up

This project uses **Yarn**. `yarn.lock` is the committed lockfile, so please don't install with npm. It would create a second, conflicting lockfile.

1. Use the Node version this project is pinned to (see `.nvmrc`)

   ```sh
   nvm use
   ```

2. Install dependencies

   ```sh
   yarn install
   ```

3. Start the development server

   ```sh
   yarn develop
   ```

## 🚀 Building and Running for Production

1. Generate a full static production build

   ```sh
   yarn build
   ```

2. Preview the site as it will appear once deployed

   ```sh
   yarn serve
   ```

If a build behaves strangely, clear Gatsby's caches first with `yarn clean`.

## 🚢 Deployment

Netlify builds from `netlify.toml`, which pins the build command (`yarn build`), the publish directory (`public`), and the Node version. Those settings override anything configured in the Netlify UI, so change them here rather than there.

## ✍️ Editing the content

All site copy lives in markdown under `content/`, so most updates don't require touching any components:

| Directory           | Renders in            | Notes                                                                                                           |
| ------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------- |
| `content/jobs/`     | Experience tabs       | Sorted by `date` descending. Set `showInTabs: false` to keep a role in the repo without showing it              |
| `content/talks/`    | Selected earlier work | Folded into the same list as projects. Title, event, location, optional `url`                                   |
| `content/featured/` | Selected work         | Larger write-ups with a cover image, sorted by `date` descending. `overline` is the small label above the title |
| `content/projects/` | Selected earlier work | Only entries with `showInProjects: true`. A compact list, mixed with talks                                      |

Paths in frontmatter behave differently depending on where the file lives. Covers are relative to the markdown file (`cover: './demo.png'`), while links to anything in `static/` must be absolute (`cta: '/masters_thesis_zoedespature.pdf'`) so they resolve from any page.

## 🧹 Code style

Prettier owns all formatting and ESLint owns correctness. `.eslintrc` extends `prettier` last so the two don't fight over indentation. A husky pre-commit hook runs both over staged files. To format everything manually:

```sh
yarn format
```

## 🎨 Color Reference

Most CSS variable names in `src/styles/variables.js` are inherited from the original dark navy theme and no longer describe the colors they hold: `--navy` is an off-white, and `--lightest-slate` is nearly black. `--ink` is the one that has been renamed to match this palette; it was `--white` (`#e6f1ff`), a pale blue that was illegible everywhere it was used.

One leftover is deliberate: `--green-tint` is still the original teal, and tints the featured project images.

| Variable           | Hex                                                                |
| ------------------ | ------------------------------------------------------------------ |
| `--navy`           | ![#F9F5F4](https://placehold.co/15x15/F9F5F4/F9F5F4.png) `#F9F5F4` |
| `--light-navy`     | ![#FFFFFF](https://placehold.co/15x15/FFFFFF/FFFFFF.png) `#FFFFFF` |
| `--lightest-navy`  | ![#D4A9AB](https://placehold.co/15x15/D4A9AB/D4A9AB.png) `#D4A9AB` |
| `--slate`          | ![#BF8084](https://placehold.co/15x15/BF8084/BF8084.png) `#BF8084` |
| `--light-slate`    | ![#1A1618](https://placehold.co/15x15/1A1618/1A1618.png) `#1A1618` |
| `--lightest-slate` | ![#1A1618](https://placehold.co/15x15/1A1618/1A1618.png) `#1A1618` |
| `--ink`            | ![#1A1618](https://placehold.co/15x15/1A1618/1A1618.png) `#1A1618` |
| `--green`          | ![#8C353B](https://placehold.co/15x15/8C353B/8C353B.png) `#8C353B` |
