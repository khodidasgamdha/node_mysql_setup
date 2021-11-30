"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class category extends Model {
        static associate(models) {
            category.hasMany(models.product);
        }
    }
    category.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [3, 255],
                        msg: "Length of Category Name should be between 3 - 255.",
                    },
                    notNull: {
                        msg: "Category Name can not be Null."
                    }
                },
                unique: {
                    msg: "Category Name must be Unique."
                },
                set(val) {
                    this.setDataValue("name", val.toLowerCase());
                },
            },
        },
        {
            sequelize,
            modelName: "category",
        }
    );
    return category;
};
