const express = require("express");
const router = express.Router();
const authenticationController = require('../app/controller/AuthenticationController');

router.post("/", authenticationController.createUser);
router.post("/login", authenticationController.login);
router.put("/edit", authenticationController.editProfile);
router.get("/logout", authenticationController.logout);
router.get("/info", authenticationController.inforUser);

module.exports = router;