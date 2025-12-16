// module.exports = {
//   publicPath: "/",
//   devServer: {
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//     },
//     proxy: {
//       "^/api": {
//         // target: "https://zalooaub.chuyendoisoquocgia.net/",
//         target: "https://localhost:5001/",
//         ws: true,
//         changeOrigin: true,
//       },
//     },
//   },
// };

// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/zalo_fe/" : "/",
};
