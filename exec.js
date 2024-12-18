const exec = require("child_process").exec;

const process = exec("dir");

process.stdout.on("data", function (data) {
  console.log(data.toString());
});

process.stderr.on("data", function (data) {
  console.log(data.toString());
});

process.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});
