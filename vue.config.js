module.exports = {
  publicPath: "/",
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: {
      "^/api": {
        target: "https://zalooaub.chuyendoisoquocgia.net/",
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
