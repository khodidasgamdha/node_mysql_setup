module.exports = {
    globalMiddleware: (req, res, next) => {
        console.log("Call Global Middleware.");
        next();
    },
};
