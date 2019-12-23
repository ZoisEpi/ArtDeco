const { src, dest, series, parallel, watch } = require("gulp");
const path = require("path");
const del = require("del");
const zip = require("gulp-zip");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("src/Typescript/tsconfig.json");
const sourcemaps = require("gulp-sourcemaps");
const eslint = require("gulp-eslint");
const mocha = require("gulp-mocha");
const exec = require('child_process').exec;


/** 
 * Clean generated files.
 **/
function clean() {
    return del([
        "dist",
        "shinyParallelPlot.zip"
    ]);
}
clean.description = "Clean generated files.";
  
/** 
 * Run eslint on 'src/typescript/' files.
 **/
function tslint() {
    return src(["./src/typescript/**/*.ts"])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}
tslint.description = "Run eslint on 'src/typescript/' files.";


/** 
 * Copy css files to 'dist' directory.
 **/
function processCssFile() {
    return src(["./src/css/**/*.css"])
        .pipe(dest("dist"))
}
processCssFile.description = "Copy css files to 'dist' directory.";

/** 
 * Run Mocha unit testing.
 **/
function unitTesting(done) {
    src("test/mocha/*.js", {read: false})
        .pipe(mocha({reporter: "nyan"}));
    done();
}
unitTesting.description = "Run Mocha unit testing.";

/** 
 * Gererate a zip file containing the Shiny testing app.
 **/
function zipShinyParallelPlot() {
    return src([
            "**/*",
            "!dist/**",
            "!doc/**",
            "!node_modules/**",
            "!src/**",
            "!test/**",
            "!*",
            "test/**",
            "!test/mocha/**"
        ])
        .pipe(zip("shinyParallelPlot.zip"))
        .pipe(dest("."))
}
zipShinyParallelPlot.description = "Gererate a zip file containing the Shiny testing app.";

/** 
 * Transpil 'src/typescript/' files and generate sourcemaps; destination is 'dist/'.
 **/
function transpilTsFiles() {
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject()).js
        .pipe(sourcemaps.write("./maps", {includeContent: false, sourceRoot: "."}))
        .pipe(dest("dist"));
}
transpilTsFiles.description = "Transpil 'src/typescript/' files and generate sourcemaps; destination is 'dist/'.";

/** 
 * Transpil 'src/Typescript/' files.
 **/
const processTsFiles = series(/*tslint, */transpilTsFiles);
processTsFiles.description = "Transpil 'src/typescript/' files.";



/** 
 * Call 'processTsFiles' when the contents of 'src/Typescript/' is changed.
 **/
function watchTsFiles() {
    watch([
        "src/Typescript/**"
    ], 
    series(processTsFiles));
}
watchTsFiles.description = "Call 'processTsFiles' and 'updateHtmlWidgetFiles' when the contents of 'src/Typescript/' is changed.";

/** 
 * Call 'updateCssFiles' and 'updateHtmlWidgetFiles' when the contents of 'src/css/' is changed.
 **/
function watchCssFiles() {
    watch([
        "src/css/**"
    ], 
    series(processCssFile));
}
watchCssFiles.description = "Call 'updateCssFiles' and 'updateHtmlWidgetFiles' when the contents of 'src/css/' is changed.";

/** 
 * Run ts linter, generate 'dist' directory, run Mocha unit testing, and update the R package 'parallelPlot' (htmlwidget).
 **/
const buildParallelPlot = series(/*tslint, */transpilTsFiles, processCssFile, unitTesting);
buildParallelPlot.description = "Run ts linter, generate 'dist' directory, run Mocha unit testing, and intall the R package 'parallelPlot' (htmlwidget).";

exports.clean = clean;
exports.tslint = tslint;
exports.transpilTsFiles = transpilTsFiles;
exports.processTsFiles = processTsFiles;
exports.watchSrcFiles = parallel(watchCssFiles, watchTsFiles);
exports.unitTesting = unitTesting;
exports.buildParallelPlot = buildParallelPlot;
exports.zipShinyParallelPlot = series(buildParallelPlot, zipShinyParallelPlot);
