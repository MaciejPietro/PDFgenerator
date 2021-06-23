const tailwindcss = require("tailwindcss");

const plugins = [
  tailwindcss("./src/assets/scss/tailwind.config.js"),
  require("autoprefixer"),
];

module.exports = {
  plugins: plugins,
};
