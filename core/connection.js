const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const config = require("../config/database")[process.env.NODE_ENV];
const { databaselogs, consolelogs } = require("../config/config.json");
const { username, password, database, host, dialect } = config;
const chalk = require("chalk");

const date = new Date().toISOString().split("T")[0];

let dir = path.join(__dirname, "..", "dbLogs", `${date}.txt`);

const loggingFile = fs.createWriteStream(dir, { flags: "a" });

const sequelizeConfig = {
    dialect: dialect,
    host: host,
};

if (databaselogs || consolelogs) {
    sequelizeConfig["logging"] = (msg) => {
        if (databaselogs) {
            loggingFile.write(msg + "\n");
        }
        if (consolelogs) {
            console.log(msg);
        }
        if (databaselogs && consolelogs) {
            loggingFile.write(msg + "\n");
            console.log(msg);
        }
    };
} else {
    sequelizeConfig["logging"] = false;
}

const sequelize = new Sequelize(database, username, password, sequelizeConfig);

sequelize
    .authenticate()
    .then(() => {
        console.log(chalk.green("Database Connected Successfull."));
    })
    .catch((err) => {
        console.log(chalk.red(`Database not Connected - ${err.message}`));
    });

sequelize.sync();

setup = { connection: sequelize };

module.exports = sequelize;
