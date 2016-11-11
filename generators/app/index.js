const generator = require(`yeoman-generator`);
const {isPlainObject} = require(`lodash`);

const {
  spawnSync: spawn,
  execSync: exec
} = require(`child_process`);

const mkdir = require(`mkdirp`);

module.exports = generator.Base.extend({

  _getNPMConfig() {
    const author = exec(`npm config get init.author.name`, {encoding: `utf-8`}) || ``;
    const email = exec(`npm config get init.author.email`, {encoding: `utf-8`}) || ``;
    return {author, email};
  },

  _ucFirst(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
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
    this.fs.copyTpl(
      // isPlainObject(f) ? this.templatePath(f.from) : this.templatePath(f),
      // isPlainObject(f) ? this.destinationPath(f.to) : this.destinationPath(f),
      typeof f === `object` ? this.templatePath(f.from) : this.templatePath(f),
      typeof f === `object` ? this.destinationPath(f.to) : this.destinationPath(f),
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

      umd: true,

      esnext: true,
      commonjs: true,

      jest: true,

      yarn: true,

      nodeVersion: process.version.split(`v`)[1]

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
      default: this.appname
    }, {
      type: `input`,
      name: `version`,
      message: `Module Version`,
      default: `0.1.0`
    }, {
      type: `input`,
      name: `github`,
      message: `Your Github username`,
    }, {
      type: `input`,
      name: `author`,
      message: `Module author (used in license)`,
      default: author.trim()
    }, {
      type: `input`,
      name: `email`,
      message: `Module author email`,
      default: email.trim()
    }, {
      type: `input`,
      name: `description`,
      message: `Module description`,
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
        `LICENSE`,
        `README.md`,
        `.gitignore`
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

      const npm = [{
        from: `_package.json`,
        to: `package.json`
      }];

      const files = [
        ...eslint,
        ...git,
        ...babel,
        ...rollup,
        ...editor,
        ...npm
      ];

      files.forEach(f => this._copyFile(f));

    }

  },

  install() {

    this._spawn(`git init`);

    if (this.props.yarn) this._spawn(`yarn`);
    else this._spawn(`npm install`);

    this._spawn(`git add .`);
    this._spawn(`git commit -m "initial"`);

  }

});
