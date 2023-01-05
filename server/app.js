const http = require("http");
const ws = require("ws");
const express = require("express");
const logger = require("morgan");
const apiRouter = require("./api");
const model = require("./database/mongo/model");
const wsConnect = require("./wsConnect");
const path = require("path");
// ========================================

// ========================================

const PORT = process.env.PORT || 7780;

if (process.env.NODE_ENV === "development") {
  console.log("NODE_ENV = development");
  require("dotenv").config(); // eslint-disable-line
}

// ========================================

const db = model.conn;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async () => {
  console.log("Successfully connect to MongoDB!");
  console.log(`dbName = "${process.env.MONGO_DBNAME}"`);
  //await model.BoardModel.deleteMany({});
  //await model.RequestModel.deleteMany({});

  let oldReq = await model.RequestModel.find({
    $or: [{ status: "pending" }, { status: "ready" }],
  });
  let nowTime = new Date().getTime();
  oldReq.map(async (req) => {
    if (nowTime - req.sendingTime > 15 * 60 * 1000 - 5000) {
      await model.RequestModel.updateOne(
        { _id: req._id },
        { $set: { status: "expired" } }
      );
      req.requestBody.map(async (re) => {
        await model.BoardModel.updateOne(
          { name: re.board },
          { $inc: { remain: re.quantity } }
        );
      });
    } else {
      setTimeout(
        () => wsConnect.requestExpired(req.requestID),
        15 * 60 * 1000 - (nowTime - req.sendingTime)
      );
    }
  });
  const app = express();
  if (process.env.NODE_ENV === "production") {
    console.log("Trust proxy is on");
    app.set("trust proxy", 1);
  }
  app.use(logger("dev"));
  app.use(express.static("build"));

  app.use("/api", apiRouter);

  // app.listen(port, () =>
  //   console.log(`App listening at http://localhost:${port}`)
  // );
  // if (process.env.NODE_ENV === "production") {
  //   const __dirname = path.resolve();
  //   app.use(express.static(path.join(__dirname, "../", "build")));
  //   app.get("/*", function (req, res) {
  //     res.sendFile(path.join(__dirname, "../", "build", "index.html"));
  //   });
  // }
  // if (process.env.NODE_ENV === "production") {
  //   const __dirname = path.resolve();
  //   app.use(express.static(path.join(__dirname, "../", "build")));
  //   app.get("/*", function (req, res) {
  //     res.sendFile(path.join(__dirname, "../", "build", "index.html"));
  //   });
  // }
  const server = http.createServer(app);
  const wss = new ws.WebSocketServer({ server });

  wss.on("connection", (ws) => {
    ws.box = ""; //記page
    ws.id = ""; //記id
    ws.authority = ""; //記authority
    ws.onmessage = wsConnect.onMessage(ws); //當ws有message時，執行後面的把丟入method
    ws.onclose = wsConnect.onClose(ws);
  });

  server.listen(PORT, () => {
    console.log(`WS listening on ${PORT}`);
  });
});
