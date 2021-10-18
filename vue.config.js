module.exports = {
  publicPath: "/",
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: {
      "^/api": {
        target: "https://localhost:5001/",
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
