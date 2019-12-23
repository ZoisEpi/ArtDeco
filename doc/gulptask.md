# `gulp` tasks

## Installation

To install gulp, see [doc/devGuide.md](./devGuide.md)).

Run the `gulp --tasks` command to ensure that `gulp` is functioning; this command allows you to see the available tasks.

## Description of available tasks

To run a task called `task-name`, type the command `gulp task-name`.

### `buildParallelPlot`

This task: 
- runs typescript linter (cf. `tslint` task);
- generates 'dist' directory; 
- runs unit testing (cf. `unitTesting` task);
- update the R package 'parallelPlot' (`htmlwidget`).

### `updateTsFiles` 

This task transpils 'src/typescript' files; resulting files are sent to `dist`.

### `tslint` 

This task runs `tslint` on `src/typescript` files (using [ESLint](https://en.wikipedia.org/wiki/ESLint), a static code analysis tool for identifying problematic patterns found in JavaScript code).

### `unitTesting` 

This task runs unit testing (using [Mocha](https://mochajs.org/)).

### `watchSrcFiles`

This task watches for changes to `src/typescript`, `src/css` or `htmlwidget` files and, when some changes occured, update `htmlwidget` directory and install it (using the `rScriptFullName` defined at the beginning of the gulp file).
