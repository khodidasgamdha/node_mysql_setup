module.exports = {
    moduleMiddleware: (req, res, next) => {
        console.log("Module Middleware call.");
        next();
    },
};
