const authentication = require("./authentication");

function route(app) {
    app.use("/authentication", authentication);
}

module.exports = route;