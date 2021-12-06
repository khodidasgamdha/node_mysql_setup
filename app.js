require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const fp = require("find-free-port");
const crons = require("./cron/cron_demo");
const Category = require("./api/category");
const Product = require("./api/product");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// create a write stream (in append mode)
var logStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
    flags: "a",
});

// log details
app.use(morgan(
    ":remote-addr - :method :url HTTP/:http-version :status :res[content-length] [:date[clf]]",
    { stream: logStream }
));

// Crons
app.use((req, res, next) => {
    crons.callEveryMinute();
    next();
});

// routes
app.use(Category);
app.use(Product);

let PORT = parseInt(process.env.PORT);

// check for free port if existing port is in use
process.on("uncaughtException", (error) => {
    fp(PORT)
        .then(([freep]) => {
            PORT = parseInt(freep);
            listenServer();
        })
        .catch((err) => {
            console.error(err);
        });
});

const listenServer = () => {
    app.listen(PORT, () => {
        console.log(`🚀 Server listenining at http://127.0.0.1:${PORT}`);
    });
};

listenServer();
