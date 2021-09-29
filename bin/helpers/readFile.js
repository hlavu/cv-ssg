const path = require("path");

module.exports.readFile = (file) => {
  let results;
  try {
    results = require("fs").readFileSync(file, "utf-8");
    if (path.extname(file) === ".md") {
      results = results
        .replace(/^# (.*$)/gim, "<h1>$1</h1>")
        .replace(/^`\n([\s\S]*?)```$/gim, "<code>$1</code>");
    }
    return results.split(/\r?\n\r?\n/).map((e) => e.replace(/\r?\n/, " "));
  } catch (err) {
    // TODO: check for errors before parsing when giving an invalid file
    console.log(require("chalk").yellow("Error occurred while reading file"));
    return process.exit(1);
  }
};
