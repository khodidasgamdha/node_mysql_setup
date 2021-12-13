const Category = require("../../../db/models").category;
const Product = require("../../../db/models").product;
const ErrorHandler = require("../../../core/ErrorHandler");

module.exports = {
    getCategory: async (req, res, next) => {
        const { pageNum, itemsPerPage } = req.query;
        try {
            const categories = await Category.findAndCountAll({
                include: {
                    model: Product,
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                },
                attributes: { exclude: ["createdAt", "updatedAt"] },
                limit: parseInt(itemsPerPage),
                offset: parseInt((pageNum-1)*itemsPerPage)
            });
            res.status(200).send({
                data: categories['rows'],
                pageNum: parseInt(pageNum),
                totalItems: categories['count'],
                totalPages: Math.ceil(categories['count']/itemsPerPage)
            });
        } catch (error) {
            return next(new ErrorHandler(error, 501));
        }
    },

    addCategory: async (req, res, next) => {
        const { name } = req.body;

        try {
            if(name) {
                await Category.create({
                    name: name,
                });
    
                res.status(201).send({
                    status: 1,
                    message: "Category Added Successfully.",
                });
            } else {
                return next (
                    new ErrorHandler("Category Name Not Found.", 404)
                )
            }
        } catch (error) {
            return next (
                new ErrorHandler(error.message, 501)
            )
        }
    },

    updateCategory: async (req, res, next) => {
        const { id, newName } = req.body;

        try {
            // find Category based on Category id
            const category = await Category.findByPk(id);

            if (category) {
                // update Categoty Details
                await category.update({
                    name: newName ? newName : category.name,
                });

                res.status(200).send({
                    status: 1,
                    message: "Category Details Updated Successfully.",
                });
            } else {
                return next (
                    new ErrorHandler("Could Not Find any Category with Given Category Id", 404)
                )
            }
        } catch (error) {
            return next (
                new ErrorHandler(error.message, 501)
            )
        }
    },

    deleteCategory: async (req, res, next) => {
        const { id } = req.body;

        try {
            // find Category based on Category id
            const category = await Category.findByPk(id);

            if (category) {
                await category.destroy();

                res.status(200).send({
                    status: 1,
                    message: "Category Deleted Successfully.",
                });
            } else {
                return next (
                    new ErrorHandler("Could Not Find any Category with Given Category Id", 404)
                )
            }
        } catch (error) {
            return next (
                new ErrorHandler(error.message, 501)
            )
        }
    },
};
