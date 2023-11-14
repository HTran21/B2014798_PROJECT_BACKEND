const express = require("express");
const router = express.Router();
const orderDeatilController = require('../app/controller/OrderDetailController')

router.put("/", orderDeatilController.editOrderDetail);


module.exports = router;