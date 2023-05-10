const fs = require("fs");

function pwd() {
  let pwd = process.argv[1];
  let arr = pwd.split("/");
  return arr.slice(0, arr.length - 1).join("/");
}

function date() {
  return new Date().toString();
}

function ls() {
  fs.readdir(".", function (err, files) {
    if (err) throw err;
    files.forEach(function (file) {
      process.stdout.write(file.toString() + "\n");
    });
    process.stdout.write("prompt > ");
  });
}

function echo(cmd) {
  let arr = cmd.split(" "); //echo hola tomas  ["echo","hola","tomas"]
  //["hola", "", "", "tomas"]
  let cleanArray = arr.slice(1).filter((elem) => elem !== ""); //["hola", "tomas"]
  return cleanArray.join(" "); // -->hola tomas
}

function cat(cmd) {
  let arr = cmd.split(" "); // ["cat", "bash.js", "commands.js"]
  for (let i = 1; i < arr.length; i++) {
    fs.readFile(arr[i], "utf8", function (err, data) {
      if (err) throw err;
      process.stdout.write(data + "\n");
      process.stdout.write("prompt > ");
    });
  }
}

function head(cmd) {
  let arr = cmd.split(" ");
  const readStream = fs.createReadStream(arr[1], { encoding: "utf8" });

  let lines = [];
  let countLines = 5;

  readStream.on("data", function (chunk) {
    lines = lines.concat(chunk.split("\n"));
    lines.length >= countLines && readStream.destroy();
  });

  readStream.on("close", function () {
    process.stdout.write(lines.slice(0, countLines).join("\n"));
    process.stdout.write("\nprompt > ");
  });
}

function tail(cmd) {
  let arr = cmd.split(" ");
  const readStream = fs.createReadStream(arr[1], { encoding: "utf8" });

  let lines = [];
  let countLines = 5;

  readStream.on("data", function (chunk) {
    lines = lines.concat(chunk.split("\n"));
    lines.length >= countLines && readStream.destroy();
  });

  readStream.on("close", function () {
    process.stdout.write(lines.slice(-countLines).join("\n"));
    process.stdout.write("\nprompt > ");
  });
}

function sort(cmd) {
  let arr = cmd.split(" ");
  let data = fs.readFileSync(arr[1], "utf8");
  let lines = data.split("\n").sort();
  process.stdout.write(lines.join("\n"));
}

function wc(cmd) {
  let arr = cmd.split(" ");
  let data = fs.readFileSync(arr[1], "utf8");
  let lines = data.split("\n");
  return lines.length.toString();
}

function uniq(cmd) {
  let arr = cmd.split(" ");
  let data = fs.readFileSync(arr[1], "utf8");
  let lines = data.split("\n");
  let newLinesUniqs = [];

  //0a
  //1a
  //2b
  //3c

  for (let i = 0; i < lines.length - 1; i++) {
    if (lines[i] !== lines[i + 1]) {
      // a !== a
      newLinesUniqs.push(lines[i]); //["a","b"]
    }
  }
  newLinesUniqs.push(lines[lines.length - 1]); //["a","b"]

  return newLinesUniqs.join("\n");
}

module.exports = {
  pwd,
  date,
  ls,
  echo,
  cat,
  head,
  tail,
  sort,
  wc,
  uniq,
};
