# Installation of developpement tools

## `node.js` (>= v10.14.1)
- retrieve the `node.js` installer and run it (see instructions in web site <https://nodejs.org>) => will also allow to use `npm` , the package manager of `node.js`;
- in a command terminal, `node -v` must return the version (for example "v10.14.1").

Optionally, you have to configure `npm` to indicate the proxies via the commands:
- `npm config set proxy http://irproxy:8082`
- `npm config set https-proxy http://irproxy:8082`

## `gulp` prerequisite
- in a command terminal, move to the root directory of the repository;
- retrieve the `gulp` installer and run it (see instructions in web site <https://gulpjs.com/>);
- run the command `npm install` (installs the modules specified in the `package.json` file) => a `node_modules` directory must now be present, as well as a `package-lock.json` file (which describes the complete tree of installed modules with the dependencies);
- run the command `npm install gulp-cli -g` to install globally `gulp-cli` (with previous command, we installed `gulp` locally; `gulp-cli` lets us use `gulp` like a global program, but using the `gulp` locally installed)
- run the `gulp --tasks` command to ensure that `gulp` is functioning; this command allows you to see the available tasks.
