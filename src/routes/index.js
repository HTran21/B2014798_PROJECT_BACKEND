const authentication = require("./authentication");
const product = require("./product");
const cart = require('./cart');
const order = require('./order')

function route(app) {
    app.use("/authentication", authentication);
    app.use("/product", product);
    app.use("/cart", cart);
    app.use("/order", order);
}

module.exports = route;