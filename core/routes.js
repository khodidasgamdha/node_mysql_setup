const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const apis = fs
    .readdirSync(path.join(__dirname, "..", "api"), { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

let allRoutes = [];

const basePath = path.join(__dirname, "..", "api")

for (let api of apis) {
    if (fs.existsSync(path.join(basePath, api, "routes.json"))) {
        const routes = require(path.join(basePath, api, "routes"));
        
        //if routes.json file contains an array
        if (routes.length) {
            for (let route of routes) {
                let singleRoute = {};

                // Checking wheteher all the fields exist or not
                if (!route.method || !route.action || !route.path) {
                    console.log(
                        chalk.black.bgYellowBright("WARN:") + 
                        `Some attributes are missing(method,path,action) of ${api} routes.json file`
                    );
                    continue;
                }

                /********************************* Path Assignemnet Here *********************************/
                if (route.root) {
                    let path = route.path[0] === "/" ? route.path : `/${route.path}`;
                    singleRoute.path = `/${api}${path}`;
                } else {
                    singleRoute.path = route.path[0] === "/" ? route.path : `/${route.path}`;
                }

                /********************************* Method Assignment Here *********************************/
                singleRoute.method = route.method;

                /********************************* Action Method Assignment Here *********************************/
                //We will check whether the action is in "file.method" format if not warning will be displayed
                let controllerArray = route.action.split(".");
                if (controllerArray.length != 2) {
                    console.log(
                        chalk.black.bgYellowBright("WARN:") + 
                        `The action is not properly defined of the ${api} routes.json file of path` + 
                        chalk.green(`'${singleRoute.path}'`)
                    );
                    continue;
                }

                let [controllerName, functionName] = controllerArray;
                let func = require(path.join(basePath, api, "controller", controllerName))[functionName];

                if (func) {
                    singleRoute.action = func;
                } else {
                    console.log(
                        chalk.black.bgYellowBright("WARN:") + 
                        `Function '${functionName}' doesn't exist in ${api} controller of ${controllerName}.js file`
                    );
                    continue;
                }

                /********************************* Middleware Asiignment Here *********************************/
                let middle = [];
                let totalMiddleware = 0;
                
                // for global middleware
                if (route.globalMiddlewares) {
                    totalMiddleware += route.globalMiddlewares.length;
                    
                    for (let middleware of route.globalMiddlewares) {
                        let middleArray = middleware.split(".");
                        if (middleArray.length != 2) {
                            console.log(
                                chalk.black.bgYellowBright("WARN:") + 
                                `The global middleware is not properly defined of the ${api} routes.json file of path: '${route.path} hence the routes will not be added coorect it to add it'`
                            );
                            break;
                        }
                        let [fileName, middlewareFunction] = middleArray;
                        let func = require(path.join(__dirname, "..", "middleware", fileName))[middlewareFunction];

                        if (func) {
                            middle.push(func);
                        } else {
                            console.log(
                                chalk.black.bgYellowBright("WARN:") + 
                                `Middleware '${middlewareFunction}' doesn't exist in globalMiddleware of ${fileName}.js file`
                            );
                            break;
                        }
                    }
                }

                // for in module middleware
                if (route.middlewares) {
                    totalMiddleware += route.middlewares.length;
                    
                    for (let middleware of route.middlewares) {
                        let middlewareArray = middleware.split(".");
                        if (middlewareArray.length != 2) {
                            console.log(
                                chalk.black.bgYellowBright("WARN:") +
                                `The middleware is not properly defined of the ${api} routes.json file of path: '${route.path}'`
                            );
                            break;
                        }
                        let [fileName, middlewareName] = middlewareArray;
                        let middleName = require(path.join(basePath, api, "middleware", fileName))[middlewareName];

                        if (middleName) {
                            middle.push(middleName);
                        } else {
                            console.log(
                                chalk.black.bgYellowBright("WARN:") +
                                `Middleware '${middlewareName}' doesn't exist in ${api} middleware of ${fileName}.js file`
                            );
                            break;
                        }
                    }
                }

                if (route.globalMiddlewares || route.middleware) {
                    if (middle.length === totalMiddleware) {
                        singleRoute.middlewares = middle;
                    } else {
                        continue;
                    }
                } else {
                    singleRoute.middlewares = middle;
                }

                //Adding a single routes to allRoutes array
                allRoutes.push(singleRoute);
            }
        } else {
            console.log(
                chalk.black.bgYellowBright("WARN:") + 
                `Your ${api} api doesn't have routes`
            );
        }
    } else {
        console.log(
            chalk.black.bgYellowBright("WARN:") + 
            `Your ${api} api doesn't have routes.json file`
        );
    }
}

//You can see all the orutes that you have made by consoling it on the screen
module.exports = allRoutes;
