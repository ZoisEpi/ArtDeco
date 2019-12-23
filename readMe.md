# Repository description

## `src/typescript` directory

It contains `typescript` source files.

## `doc` directory

This directory contains additional documentation:
- [doc/contents.md](./doc/contents.md) describes the features of this Art Deco D3.js Project;
- [doc/devGuide.md](./doc/devGuide.md) describes how to install the tools used for developping;
- [doc/gulpTask.md](./doc/gulpTasks.md) describes the tasks that you can run thanks to `gulp`;


## `test` directory


- `mocha` directory contains unit tests which can be run thanks to command `npm test`.

## `gulp.js` file

`gulp` is a task runner which is used during software creation process. The file `gulp.js` defines the available tasks (more info in [doc/gulpTask.md](./doc/gulpTasks.md)).

## `package.json` and `package-lock.json` files

These files contains the list of required packages (`package-lock.json` contains the full tree of all required dependencies).
