const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const appConnRouter = require("./routes/appConnect");

const app = express();
app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use("/app", appConnRouter);

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
