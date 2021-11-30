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
                    notNull: {
                        msg: "Product Name can not be Null."
                    }
                },
            },
            categoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: {
                        msg: "Category Id Should be an Integer.",
                    },
                    notNull: {
                        msg: "Product Name can not be Null."
                    }
                },
            },
            sku: {
                type: DataTypes.STRING,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    isFloat: {
                        msg: "Price Should be Float.",
                    },
                    notNull: {
                        msg: "Price can not be Null."
                    }
                },
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Image can not be Null."
                    }
                },
            },
        },
        {
            sequelize,
            modelName: "product",
            hasTrigger: true
        }
    );
    return product;
};
