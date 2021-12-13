const multer = require("multer");
const path = require("path");
const fs = require("fs");
const ErrorHandler = require("../../../core/ErrorHandler");
const { 
    product: Product,
    category: Category
} = require("../../../db/models");

module.exports = {
    getProduct: async (req, res, next) => {
        const { pageNum, itemsPerPage } = req.query;
        try {
            const products = await Product.findAndCountAll({
                include: {
                    model: Category,
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                },
                attributes: { exclude: ["createdAt", "updatedAt"] },
                limit: parseInt(itemsPerPage),
                offset: parseInt((pageNum-1)*itemsPerPage)
            });
            res.status(200).send({
                data: products['rows'],
                pageNum: parseInt(pageNum),
                totalItems: products['count'],
                totalPages: Math.ceil(products['count']/itemsPerPage)
            });
        } catch (error) {
            return next(new ErrorHandler(error, 501));
        }
    },

    addProduct: async (req, res, next) => {
        try {
            const upload = setup.upload.fields([{ name: "productImage", maxCount: 1 }]);
            upload(req, res, async (err) => {

                if (err instanceof multer.MulterError) {
                    return next(
                        new ErrorHandler("Image Upload error.", 501)
                    );
                } else if (err) {
                    return next(
                        new ErrorHandler(err, 501)
                    );
                }

                const { name, categoryName, price } = req.body;
                
                if (name && categoryName && price && req.files["productImage"]) {
                    // find Category based on Category Name or Create New One
                    const [category, created] = await Category.findOrCreate({
                        where: {
                            name: categoryName.toLowerCase(),
                        },
                    });

                    await Product.create({
                        name: name,
                        categoryId: category.dataValues.id,
                        price: price,
                        image: req.files["productImage"] ? req.files["productImage"][0]["filename"] : null,
                    });

                    res.status(200).send({
                        status: 1,
                        message: "Product Added Successfully.",
                    });
                } else {
                    return next(
                        new ErrorHandler("Missing Required Fields.", 404)
                    );
                }
            });
        } catch (error) {
            return next(new ErrorHandler(error.errors[0], 501));
        }
    },

    updateProduct: async (req, res, next) => {
        const { id, name, categoryName, sku, price } = req.body;

        try {
            // find Product based on Product id
            const product = await Product.findByPk(id);

            if (product) {
                // find Category based on Category Name or Create New One
                const [category, created] = await Category.findOrCreate({
                    where: {
                        name: categoryName.toLowerCase(),
                    },
                });

                await product.update({
                    name: name ? name : product.name,
                    categoryId: category ? category.dataValues.id : product.categoryId,
                    sku: sku ? sku : product.sku,
                    price: price ? price : product.price,
                    image: product.image,
                });

                res.status(200).send({
                    status: 1,
                    message: "Product Updated Successfully.",
                });
            } else {
                return next(
                    new ErrorHandler(
                        "Could Not Find any Product with Given Product Id",
                        404
                    )
                );
            }
        } catch (error) {
            return next(new ErrorHandler(error.message, 501));
        }
    },

    deleteProduct: async (req, res, next) => {
        const { id } = req.body;

        try {
            // find Product based on Product id
            const product = await Product.findByPk(id);

            if (product) {
                await product.destroy();

                // delete Image
                let dir = path.join(__dirname, "..", "..", "..", "uploads", product.image);

                fs.unlink(dir, (err) => {
                    if (err) throw err;
                    console.log("Image was deleted");
                });

                res.status(200).send({
                    status: 1,
                    message: "Product Deleted Successfully.",
                });
            } else {
                return next(
                    new ErrorHandler(
                        "Could Not Find any Product with Given Product Id",
                        404
                    )
                );
            }
        } catch (error) {
            return next(new ErrorHandler(error.message, 501));
        }
    },
};
