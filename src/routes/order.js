const express = require("express");
const router = express.Router();
const orderController = require('../app/controller/OrderController')

router.post("/", orderController.addOrder);
router.get("/:id", orderController.listOrder);


module.exports = router;