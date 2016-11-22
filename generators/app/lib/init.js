const chalk = require(`chalk`);

module.exports = ({author, github, name}) => {

  console.log();

  console.log(`Hey`, `${author},`);
  console.log();

  console.log(`Created module`, chalk.yellow(`'${name}'`), `with generator-module-boilerplate`);
  console.log();

  console.log(`use`, chalk.cyan(`npm run build:watch`), `/`, chalk.cyan(`npm run test:watch`), `for development mode`);

  console.log(`use`, chalk.cyan(`npm run build`), `for production builds (ES2015, CommonJS, UMD)`);

  console.log(`use`, chalk.cyan(`npm run release (premajor|patch|minor|major)`, `for releasing`));
  console.log();

  console.log(`everything is set up to push to https://github.com/${github}/${name}.git`);
  console.log();


};
