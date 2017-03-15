# <%= name %>

![Node](https://img.shields.io/node/v/<%= name %>.svg?style=flat-square)
[![NPM](https://img.shields.io/npm/v/<%= name %>.svg?style=flat-square)](https://www.npmjs.com/package/<%= name %>)
[![Travis](https://img.shields.io/travis/<%= github %>/<%= name %>/master.svg?style=flat-square)](https://travis-ci.org/<%= github %>/<%= name %>)
[![David](https://img.shields.io/david/<%= github %>/<%= name %>.svg?style=flat-square)](https://david-dm.org/<%= github %>/<%= name %>)
[![Coverage Status](https://img.shields.io/coveralls/<%= github %>/<%= name %>.svg?style=flat-square)](https://coveralls.io/github/<%= github %>/<%= name %>)<% if (gitmoji) { %>
[![Gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square)](https://gitmoji.carloscuesta.me/)<% } %>
[![NPM](https://img.shields.io/npm/dt/<%= name %>.svg?style=flat-square)](https://www.npmjs.com/package/<%= name %>)

> <%= description %>

### Usage

```js
import <%= ccname %> from '<%= name %>';

```

### Installation

Install via [yarn](https://github.com/yarnpkg/yarn)

	yarn add <%= name %> (--dev)

or npm

	npm install <%= name %> (--save-dev)


### configuration

You can pass in extra options as a configuration object (➕ required, ➖ optional, ✏️ default).

```js
import <%= ccname %> from '<%= name %>';

```

➖ **property** ( type ) ` ✏️ default `
<br/> 📝 description
<br/> ❗️ warning
<br/> ℹ️ info
<br/> 💡 example

### methods

#### #name

```js
<%= ccname %>

```

### Examples

See [`example`](example/script.js) folder or the [runkit](https://runkit.com/<%= github %>/<%= name %>) example.

### Builds

If you don't use a package manager, you can [access `<%= name %>` via unpkg (CDN)](https://unpkg.com/<%= name %>/), download the source, or point your package manager to the url.

`<%= name %>` is compiled as a collection of [CommonJS](http://webpack.github.io/docs/commonjs.html) modules & [ES2015 modules](http://www.2ality.com/2014/0
  -9/es6-modules-final.html) for bundlers that support the `jsnext:main` or `module` field in package.json (Rollup, Webpack 2)

The `<%= name %>` package includes precompiled production and development [UMD](https://github.com/umdjs/umd) builds in the [`dist` folder](https://unpkg.com/<%= name %>/dist/). They can be used directly without a bundler and are thus compatible with many popular JavaScript module loaders and environments. You can drop a UMD build as a [`<script>` tag](https://unpkg.com/<%= name %>) on your page. The UMD builds make `<%= name %>` available as a `window.<%= ccname %>` global variable.

### License

The code is available under the [<%= license %>](LICENSE) license.

### Contributing

We are open to contributions, see [CONTRIBUTING.md](CONTRIBUTING.md) for more info.

### Misc

This module was created using [generator-module-boilerplate](https://github.com/duivvv/generator-module-boilerplate).
