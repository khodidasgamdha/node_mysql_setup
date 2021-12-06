require("dotenv").config();
const morgan = require("morgan");
const fs = require("fs");
const path = require("path")
const crons = require("./cron/cron_demo");
const express = require("express");
const Category = require("./api/category");
const Product = require("./api/product");

const app = express();

const PORT = process.env.PORT || 5000;

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

app.use(Category);
app.use(Product);

app.listen(PORT, () => {
    console.log(`🚀  Server listenining at http://127.0.0.1:${PORT}`);
});
