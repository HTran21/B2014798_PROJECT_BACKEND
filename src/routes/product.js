const express = require("express");
const router = express.Router();
const productController = require('../app/controller/ProductController')

router.get("/", productController.listProduct);
router.post("/", productController.addProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);


module.exports = router;