const path = require("path");
const fs = require("fs");

let functions = {};
const basePath = path.join(__dirname, "..", "functions");

const addFunctions = (basePath, name) => {
    const files = fs.readdirSync(basePath);
    files.forEach((file) => {
        const fileArray = file.split(".");

        const base = name ? name : functions;

        if (fileArray.length == 2) {
            const fileName = fileArray[0];
            const { ...func } = require(path.join(basePath, fileName));

            base[fileName] = {};
            for (let key in func) {
                base[fileName][key] = func[key];
            }
        } else {
            const newPath = path.join(basePath, file);
            base[file] = {};
            addFunctions(newPath, base[file]);
        }
    });
};

addFunctions(basePath, null);

setup.functions = functions;

module.exports = functions;

// setup.functions["file1"]["callFunctions1"]()
// setup.functions["folder"]["file2"]["callFunctions2"]()
// setup.functions["folder"]["folder"]["file3"]["callFunctions3"]()
