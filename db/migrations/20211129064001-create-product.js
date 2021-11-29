"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("products", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            categoryId: {
                type: Sequelize.INTEGER,
            },
            sku: {
                type: Sequelize.STRING,
            },
            price: {
                type: Sequelize.FLOAT,
            },
            image: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("NOW()"),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("NOW()"),
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("products");
    },
};
