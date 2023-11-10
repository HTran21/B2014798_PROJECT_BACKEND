const authentication = require("./authentication");
const product = require("./product");

function route(app) {
    app.use("/authentication", authentication);
    app.use("/product", product);
}

module.exports = route;