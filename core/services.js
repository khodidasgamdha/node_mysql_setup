const path = require("path");
const fs = require("fs");

const basePath = path.join(__dirname, "..", "api");

const apis = fs
    .readdirSync(basePath, { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name);

let services = {};

apis.forEach((dir) => {
    services[dir] = {};
    const files = fs.readdirSync(path.join(basePath, dir, "services"));
    
    files.forEach((file) => {
        if(file.split(".").length == 2) {
    
            const fileName = file.split(".")[0]
            services[dir][fileName] = {}
            const { ...functions } = require(path.join(basePath, dir, "services", fileName));
            for (let key in functions) {
                services[dir][fileName][key] = functions[key];
            }
        }
    })
});

setup.services = services;
module.exports = services;

// setup.services["category"]["service"]["getCategory"]()
