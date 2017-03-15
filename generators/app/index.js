const generator = require(`yeoman-generator`);

const {isPlainObject} = require(`lodash`);

const init = require(`./lib/init`);

const {
  spawnSync: spawn,
  execSync: exec
} = require(`child_process`);

const mkdir = require(`mkdirp`);

let isFirstClear = true;

module.exports = generator.Base.extend({

  _clearConsole() {
    process.stdout.write(isFirstClear ? `\x1bc` : `\x1b[2J\x1b[0f`);
    isFirstClear = false;
  },

  _getNPMConfig() {
    const author = exec(`npm config get init.author.name`, {encoding: `utf-8`}) || ``;
    const email = exec(`npm config get init.author.email`, {encoding: `utf-8`}) || ``;
    return {author, email};
  },

  _ucFirst(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  },

  _hyphenate(name) {
    return name.split(` `).join(`-`);
  },

  _camelCase(name) {

    return name.split(`-`).map((s, i) => {
      if (i === 0) return s;
      return this._ucFirst(s);
    }).join(``);

  },

  _spawn(cmd) {

    const parts = cmd.split(` `);
    const [first, ...rest] = parts;

    spawn(first, rest, {stdio: `inherit`});

  },

  _copyFile(f) {

    let from = f;
    let to = f;

    if (isPlainObject(f)) ({from, to} = f);

    this.fs.copyTpl(
      this.templatePath(from),
      this.destinationPath(to),
      this.props,
      {
        interpolate: /<%=([\s\S]+?)%>/g
      }
    );

  },

  _createDir(d) {

    mkdir(d, e => {
      if (e) console.error(e);
    });

  },

  initializing() {

    this.props = {
      yarn: true,
      flow: false,
      license: `MIT`,
      gitmoji: true,
      year: new Date().getFullYear()
    };

    try {
      exec(`yarn --version >/dev/null 2>&1`, {encoding: `utf8`});
    } catch (e) {
      this.props.yarn = false;
    }

  },

  prompting() {

    const {author, email} = this._getNPMConfig();

    return this.prompt([{
      type: `input`,
      name: `name`,
      message: `Module Name`,
      default: this._hyphenate(this.appname)
    }, {
      type: `rawlist`,
      name: `license`,
      message: `License`,
      choices: [{
        value: `MIT`,
        name: `MIT`
      }, {
        value: `BSD-2-Clause`,
        name: `BSD-2-Clause`
      }, {
        value: `BSD-3-Clause`,
        name: `BSD-3-Clause`
      }, {
        value: `ISC`,
        name: `ISC`
      }, {
        value: `Apache-2.0`,
        name: `Apache-2.0`
      }]
    }, {
      type: `input`,
      name: `author`,
      message: `Author (also used in license)`,
      default: author.trim()
    }, {
      type: `input`,
      name: `email`,
      message: `Author Email`,
      default: email.trim()
    }, {
      type: `input`,
      name: `description`,
      message: `Description`,
      default: `this is a description`
    }, {
      type: `input`,
      name: `github`,
      message: `Github Username`,
    }, {
      type: `confirm`,
      name: `flow`,
      default: false,
      message: `Do you need Flow for type checking? (No)`,
    }, {
      type: `confirm`,
      name: `gitmoji`,
      default: false,
      message: `Are you using Gitmoji in your commits? (No)`,
    }]).then(props => {
      this.props = Object.assign(this.props, props);
      this.props.ccname = this._camelCase(this.props.name);
    });

  },

  writing: {

    appFiles() {

      const files = [
        `example/script.js`,
        `src/index.js`
      ];

      files.forEach(f => this._copyFile(f));

    },

    settings() {

      this._createDir(`__tests__`);

      const eslint = [
        `.eslintignore`,
        `.eslintrc`,
      ];

      const git = [
        `README.md`,
        {from: `licences/${this.props.license}`, to: `LICENSE`},
        {from: `_gitignore`, to: `.gitignore`}
      ];

      const github = [
        `CONTRIBUTING.md`,
        `.github/ISSUE_TEMPLATE.md`,
        `.github/PULL_REQUEST_TEMPLATE.md`
      ];

      const babel = [
        `.babelrc`
      ];

      const rollup = [
        `rollup.config.js`
      ];

      const editor = [
        `.editorconfig`
      ];

      const npm = [
        {from: `_package.json`, to: `package.json`},
        `.release.json`
      ];

      const ci = [
        `.travis.yml`
      ];

      let files = [
        ...eslint,
        ...git,
        ...github,
        ...babel,
        ...rollup,
        ...editor,
        ...npm,
        ...ci
      ];

      if (this.props.flow) {

        const flow = [
          `.flowconfig`
        ];

        files = [
          ...files,
          ...flow
        ];
      }

      files.forEach(f => this._copyFile(f));

    }

  },

  install() {

    const {github, name} = this.props;

    this._spawn(`git init`);
    this._spawn(`git remote add origin https://github.com/${github}/${name}.git`);
    this._spawn(`git branch --set-upstream-to=origin/master master`);

    if (this.props.yarn) this._spawn(`yarn`);
    else this._spawn(`npm install`);

    this._spawn(`git add .`);
    const emoji = this.props.gitmoji ? `:tada: ` : ``;
    spawn(`git`, [`commit`, `-m`, `${emoji}initial commit`], {stdio: `inherit`});

    if (this.props.yarn) this._spawn(`node node_modules/husky/bin/install`); // see husky readme.

    this._clearConsole();

    init(this.props);

  }

});
