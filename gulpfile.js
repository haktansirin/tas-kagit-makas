const { src, dest, series, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

// compile sass
const compileSass = () => {
  return src("./assets/scss/**/*.scss").pipe(sass()).pipe(dest("./assets/css"));
};

// dev watch
const devWatch = () => {
  return watch("./assets/scss/**/*.scss", compileSass);
};

exports.default = series(compileSass, devWatch);
