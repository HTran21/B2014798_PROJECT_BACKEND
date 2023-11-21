const express = require("express");
const router = express.Router();
const orderController = require('../app/controller/OrderController')

router.get("/", orderController.listOrderAdmin);
router.put("/", orderController.updateOrderAdmin);
router.post("/", orderController.addOrder);
router.delete("/admin/:id", orderController.deniedOrderAdmin);
router.get("/admin", orderController.listOrderAccessAdmin);
router.get("/:id", orderController.listOrder);
router.delete("/:id", orderController.deleteOrder);


module.exports = router;