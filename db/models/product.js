"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class product extends Model {
        static associate(models) {
            product.belongsTo(models.category, {
                foreignKey: "categoryId",
            });
        }
    }
    product.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [3, 255],
                        msg: "Length of Product Name should be between 3 - 255.",
                    },
                },
            },
            categoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: {
                        msg: "Category Id Should be an Integer.",
                    },
                },
            },
            sku: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull(val) {
                        if (val.length <= 0) {
                            throw new Error("SKU Should Not be Null.");
                        }
                    },
                },
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    isFloat: {
                        msg: "Price Should be Float.",
                    },
                },
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull(val) {
                        if (val.length <= 0) {
                            throw new Error("Image Should Not be Null.");
                        }
                    },
                },
            },
        },
        {
            sequelize,
            modelName: "product",
        }
    );
    return product;
};
