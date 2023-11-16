const express = require("express");

const productAddController = require("../controllers/productaddController");
const uplodeFileMiddleWare = require("../middleware/uplodeFile");
// const veryfyToken = require("../middleware/veryfyToken");

const router = express.Router();

router.post(
  "/add",
  uplodeFileMiddleWare,
  productAddController.createProductAddController
);

router.get("/get", productAddController.getProducts);

module.exports = router;
