const authentication = require("./authentication");
const product = require("./product");
const cart = require('./cart');
const order = require('./order');
const orderdetail = require('./orderdetail');
const customer = require('./customer');

function route(app) {
    app.use("/authentication", authentication);
    app.use("/product", product);
    app.use("/cart", cart);
    app.use("/order", order);
    app.use("/orderdetail", orderdetail);
    app.use("/customer", customer);
}

module.exports = route;