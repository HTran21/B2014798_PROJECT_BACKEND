const express = require("express");
const router = express.Router();
const cartController = require('../app/controller/CartController')

router.get("/:id", cartController.listCart);
router.post("/:id", cartController.addToCart);
router.put("/:id", cartController.updateCart);
router.delete("/:id", cartController.deleteCart);


module.exports = router;