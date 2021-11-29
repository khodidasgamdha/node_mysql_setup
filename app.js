require('dotenv').config();
const express = require("express");
const Category = require("./api/category");
const Product = require("./api/product");

const app = express();

const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(Category)
app.use(Product)

app.listen(PORT, () => {
    console.log(`🚀  Server listenining at http://127.0.0.1:${PORT}`);
});
