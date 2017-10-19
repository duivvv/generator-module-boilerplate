# generator-module-boilerplate

[![npm version](https://badge.fury.io/js/generator-module-boilerplate.svg)](https://badge.fury.io/js/generator-module-boilerplate)
[![David](https://img.shields.io/david/duivvv/generator-module-boilerplate.svg?style=flat-square)](https://david-dm.org/duivvv/generator-module-boilerplate)

> ⚙️ This generator generates a (universal) npm module boilerplate

## What does module-boilerplate offer?

- **Project structure** to create a cross build npm module
- **Linting**: via [ESLint](http://eslint.org/)
- **Testing**: with Coverage via [Jest](https://facebook.github.io/jest/)
- **[CommonJS](http://webpack.github.io/docs/commonjs.html)**: build (`/dist/cjs`)  via [Babel](https://babeljs.io/)
- **[ES2015](http://www.2ality.com/2014/09/es6-modules-final.html)**: build (`/dist/es`) via [Babel](https://babeljs.io/)
- **[UMD](https://github.com/umdjs/umd)** build: (`/dist/umd`) via [Rollup](http://rollupjs.org/) (unminified & minified version)
- **Watch scripts**: `npm run (test|build):watch`
- **Git hooks**: precommit, prepush hooks defined in `package.json`
- **prepublish** (before publishing to npm) script `npm run build`
- Only **publish what's needed** (`files` field in `package.json`)

## Nice to haves

- **README.md** template :memo:
- ... with [npm](https://www.npmjs.com/), [Travis](https://travis-ci.org/), [David](https://david-dm.org/), [Gitmoji](https://gitmoji.carloscuesta.me/) **badges** :chart_with_upwards_trend:
- **License** generation
- **[Travis CI](https://travis-ci.org/)** integration :construction_worker:
- **Coverage Reporting** via [Coveralls](https://coveralls.io/)
- **Typechecking**: via **[Flow](https://flowtype.org/)** (optional)
- **[webpro/release-it](https://github.com/webpro/release-it)** integration
- **Optimized** for [modern bundlers](https://github.com/rollup/rollup/wiki/jsnext:main)
- **[unpkg](https://unpkg.com/)** ready 😎


<small>+ Invisible contract which states that you will use [gitmoji](https://gitmoji.carloscuesta.me/) for commits 🤘 (just kidding, but you should)</small>

You should probably enable [greenkeeper](https://greenkeeper.io/) (keeps your dependencies up to date)

## Getting Started

### Dependencies

install [yeoman](http://yeoman.io) & this module globally via [yarn](https://github.com/yarnpkg/yarn)

(this is one of the 'never install modules globally' exceptions)

```console
yarn global add yo
yarn global add generator-module-boilerplate
```

or via npm

```console
npm install yo -g
npm install generator-module-boilerplate -g
```

## Running the generator


```console
yo module-boilerplate
```

## Getting Started / Scripts

### watch 👀

Testing via [Jest](https://facebook.github.io/jest/) in [interactive watch mode](https://egghead.io/lessons/javascript-use-jest-s-interactive-watch-mode)

```console
npm run test:watch
```

**[CommonJS](http://webpack.github.io/docs/commonjs.html) build** (`/dist/cjs`) via [Babel](https://babeljs.io/)

```console
npm run build:watch

```

ℹ️ use a [split terminal](https://hyper.is/) window for maximum developer experience

### build ⚙️

```console
npm run build
```
The build command runs the following steps:

1. **Linting** via [ESLint](http://eslint.org/) (+ optional [Flow](https://flowtype.org/) typechecking)
3. **Testing** (with Coverage) via [Jest](https://facebook.github.io/jest/)
4. **[CommonJS](http://webpack.github.io/docs/commonjs.html) build** (`/dist/cjs`)  via [Babel](https://babeljs.io/)
5. **[ES2015](http://www.2ality.com/2014/09/es6-modules-final.html) build** (`/dist/es`) via [Babel](https://babeljs.io/)
6. **[UMD](https://github.com/umdjs/umd) builds** (`/dist`) via [Rollup](http://rollupjs.org/)

which equals to:

1. `npm run lint`
3. `npm run test:coverage`
2. `npm run build:cjs`
4. `npm run build:es`
5. `npm run build:umd`


### testing :white_check_mark:

Tests your `src` folder via [Jest](https://facebook.github.io/jest/), (test env is included in `.babelrc`)

```console
npm run test
```

or with coverage (also used in precommit / prepush / prepublish)

```console
npm run test:coverage
```

### releasing 🔖


ℹ️ more info on [webpro/release-it](https://github.com/webpro/release-it)
<br/> ℹ️ premajor = x.x.x-beta.x

<br/>⚠️ watch out, semver has different rules pre 1.0.0

```console
npm run release (premajor|patch|minor|major)
```

1. Creates a **version bump** in package.json
2. **Commits** a change with this message '🔖 vX.X.X'
3. Creates a **tag** (github release) with the name 'vX.X.X' and as description 'Version X.X.X'
4. **Push** to remote (with tags)
5. **`npm publish`** (with **`npm run build`** as **prepublish** script)

⚠️ don't forget to answer `Y` on the 'publish to npm' question

You can change the release settings in the `.release.json` file in the root of your module folder.

## Git Hooks ⛏

There are 2 git hooks defined in `scripts` in `package.json`
<br/>they check for **broken builds** and **prevent push or commit**.

`prepush` and `precommit` trigger:

1. Linting via [ESLint](http://eslint.org/) (+ optional [Flow](https://flowtype.org/) typechecking)
2. Testing via [Jest](https://facebook.github.io/jest/)


## License

The code is available under the [MIT](LICENSE) license.
