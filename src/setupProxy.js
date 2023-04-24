const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  const port = process.env.PORT || 8000;
  app.use(
    "/api",
    createProxyMiddleware({
      target: `http://${process.env.REACT_APP_API_HOST}:${port}`,
      changeOrigin: true,
    })
  );
};
