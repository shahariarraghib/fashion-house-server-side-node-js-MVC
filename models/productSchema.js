const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    price: { type: Number },

    description: {
      type: String,
    },

    productMaterials: {
      type: String,
    },

    images: [
      {
        data: Buffer,
        contentType: String,
      },
    ],

    productCategoryMaleFemaleandBaby: {
      type: String,
    },

    productDetails: [
      {
        pickedProductDetailsSize: { type: String },
        pickedProductDetailsColor: { type: String },
        productDetailsQuantity: { type: Number },
      },
    ],

    reviews: {
      type: Number,
    },
  },

  {
    timestamps: true,
  }
);

const addProduct = mongoose.model("product", productSchema);
module.exports = addProduct;
