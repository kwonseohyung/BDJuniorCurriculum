// const { defineConfig } = require("@vue/cli-service");
// module.exports = defineConfig({
//   transpileDependencies: true,
// });

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000/api",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  outputDir: "../backend/routes",
};
// module.exports = {
//   pages: {
//     index: {
//       // entry for the page
//       entry: "frontend/src/main.js",
//       title: "Index Page",
//     },
//   },
// };

// build: {
//   index: path.resolve(__dirname, '../backend')
// }
