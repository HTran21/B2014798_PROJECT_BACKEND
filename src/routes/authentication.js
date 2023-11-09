const express = require("express");
const router = express.Router();
const authenticationController = require('../app/controller/AuthenticationController');

router.post("/", authenticationController.createUser);
router.post("/staff", authenticationController.createStaff);
router.post("/login", authenticationController.login);
router.post("/loginStaff", authenticationController.loginStaff);
router.put("/edit", authenticationController.editProfile);
router.get("/logout", authenticationController.logout);
router.get("/info", authenticationController.inforUser);

module.exports = router;