const express = require("express");

const userController = require("../controllers/userInfoController");
const veryfyToken = require("../middleware/veryfyToken");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);

// router.get("/me", veryfyToken, userController.getMe);

module.exports = router;
