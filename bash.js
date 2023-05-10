//console.log(process);
// console.log(Object.keys(process));
// Un prompt como output
const commands = require("./commands.js");
process.stdout.write("prompt > ");
// El evento STDIN 'data' se dispara cuando el usuario escribe una línea
process.stdin.on("data", function (data) {
  let cmd = data.toString().trim(); // Remueve la nueva línea
  let result = "";
  if (cmd === "pwd") {
    // muestra pwd
    result = commands.pwd();
  }
  if (cmd === "date") {
    // muestra date
    result = commands.date();
  }
  if (cmd === "ls") {
    commands.ls();
  }
  // verifica si el command es echo
  if (cmd.split(" ")[0] === "echo") {
    result = commands.echo(cmd);
  }
  if (cmd.split(" ")[0] === "cat") {
    commands.cat(cmd);
  }
  if (cmd.split(" ")[0] === "head") {
    commands.head(cmd);
  }
  if (cmd.split(" ")[0] === "tail") {
    commands.tail(cmd);
  }
  if (cmd.split(" ")[0] === "sort") {
    commands.sort(cmd);
  }
  if (cmd.split(" ")[0] === "wc") {
    result = commands.wc(cmd);
  }
  if (cmd.split(" ")[0] === "uniq") {
    result = commands.uniq(cmd);
  }
  process.stdout.write(result);
  process.stdout.write("\nprompt > ");
});
// console.log(process.argv);
