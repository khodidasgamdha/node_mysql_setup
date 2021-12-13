const path = require("path");
const fs = require("fs");

const crons = [];
const basePath = path.join(__dirname, "..", "cron");

const cronFiles = fs
    .readdirSync(basePath, { withFileTypes: true })
    .filter((file) => file.isFile())
    .map((file) => file.name);

cronFiles.forEach((file) => {
    const { ...functions } = require(path.join(basePath, file));
    for (let key in functions) {
        crons.push(functions[key]);
    }
});

module.exports = crons;
