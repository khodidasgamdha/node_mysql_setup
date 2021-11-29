const express = require("express");
const Category = require("../db/models").category;

const router = new express.Router();

// Add New Category
router.post("/category", async (req, res) => {
    const name = req.body.category;

    try {
        await Category.create({
            name: name,
        });

        res.status(200).send({
            status: 1,
            message: "Category Added Successfully.",
        });
    } catch (error) {
        res.status(501).send({
            status: 0,
            message: error,
        });
    }
});

// Update Category
router.put("/category", async (req, res) => {
    const id = req.body.categoryId;
    const newName = req.body.newCategory;

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
            res.status(404).send({
                status: 0,
                message: "Could Not Find any Category with Given Category Id",
            });
        }

    } catch (error) {
        res.status(501).send({
            status: 0,
            message: error,
        });
    }
});

// Delete Category
router.delete("/category", async (req, res) => {
    const id = req.body.categoryId;

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
            res.status(404).send({
                status: 0,
                message: "Could Not Find any Category with Given Category Id",
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
