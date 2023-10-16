const express = require("express");

const productAddController = require("../controllers/productaddController");
const uplodeFileMiddleWare = require("../middleware/uplodeFile");
// const veryfyToken = require("../middleware/veryfyToken");

const router = express.Router();

router.post(
  "/",
  uplodeFileMiddleWare,
  productAddController.createProductAddController
);
// router.post("/login", userController.login);

// router.get("/me", veryfyToken, userController.getMe);

module.exports = router;
