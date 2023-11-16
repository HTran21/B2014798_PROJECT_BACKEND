const express = require("express");
const router = express.Router();
const orderController = require('../app/controller/OrderController')

router.get("/", orderController.listOrderAdmin);
router.post("/", orderController.addOrder);
router.get("/:id", orderController.listOrder);
router.delete("/:id", orderController.deleteOrder);


module.exports = router;