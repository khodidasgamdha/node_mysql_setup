const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Product = require("../db/models").product;
const Category = require("../db/models").category;


const router = new express.Router();


// image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let dir = path.join(__dirname, "../", "public", "images");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });


// Add New Product
router.post("/product", upload.single("productImage"), async (req, res) => {
    const name = req.body.product;
    const categoryName = req.body.category;
    const sku = req.body.sku;
    const price = req.body.price;
    const image = req.file.originalname;

    try {
        // find Category based on Category Name or Create New One
        const [category, created] = await Category.findOrCreate({
            where: {
                name: categoryName.toLowerCase(),
            }
        });

        await Product.create({
            name: name,
            categoryId: category.dataValues.id,
            sku: sku,
            price: price,
            image: image,
        });

        res.status(200).send({
            status: 1,
            message: "Product Added Successfully.",
        });
    } catch (error) {
        res.status(501).send({
            status: 0,
            message: error,
        });
    }
});


// Update Product
router.put("/product", upload.single("productImage"), async (req, res) => {
    const id = req.body.productId;
    const name = req.body.product;
    const categoryName = req.body.category;
    const sku = req.body.sku;
    const price = req.body.price;
    
    try {
        // find Product based on Product id
        const product = await Product.findByPk(id);

        if (product) {
            
            // find Category based on Category Name or Create New One
            const [category, created] = await Category.findOrCreate({
                where: {
                    name: categoryName.toLowerCase(),
                }
            });
    
            await product.update({
                name: name ? name : product.name,
                categoryId: category ? category.dataValues.id : product.categoryId,
                sku: sku ? sku : product.sku,
                price: price ? price : product.price,
                image: req.file ? req.file.originalname : product.image,
            });
    
            res.status(200).send({
                status: 1,
                message: "Product Updated Successfully.",
            });
    
        } else {
            res.status(404).send({
                status: 0,
                message: "Could Not Find any Product with Given Product Id",
            });
        }

    } catch (error) {
        res.status(501).send({
            status: 0,
            message: error,
        });
    }
});


// Delete Product
router.delete("/product", async (req, res) => {
    const id = req.body.productId;
    
    try {
        // find Product based on Product id
        const product = await Product.findByPk(id);

        if (product) {
            await product.destroy();
    
            res.status(200).send({
                status: 1,
                message: "Product Deleted Successfully.",
            });
        
        } else {
            res.status(404).send({
                status: 0,
                message: "Could Not Find any Product with Given Product Id",
            });
        }

    } catch (error) {
        res.status(501).send({
            status: 0,
            message: error,
        });
    }
});


module.exports = router;
