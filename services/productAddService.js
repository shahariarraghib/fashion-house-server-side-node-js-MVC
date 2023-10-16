const addProduct = require("../models/productSchema");
const fs = require("fs");

// exports.createproductAddService = async (bodyData, imageFile) => {
//   // console.log(imageFile);
//   // imageFile.forEach((file) => {
//   //   const filePath = `uploads/${file.filename}`;

//   //   fs.rename(file.path, filePath, (err) => {
//   //     if (err) {
//   //       return res.status(500).json({ error: "Failed to store the file" });
//   //     }
//   //   });
//   // });

//   //   let img = fs.readFileSync(imageFile.path);
//   console.log("service", imageFile);
//   const result = await addProduct.create({
//     name: bodyData.name,
//     // images: {
//     //   data: img,
//     //   contentType: imageFile.originalname,
//     // },
//   });
//   return result;
// };

exports.createproductAddService = async (bodyData, imageFiles) => {
  try {
    // console.log(bodyData, imageFiles);
    // Initialize an array to store the image data and content types.
    const images = [];
    const productDetailArrayValue = [];
    // Iterate through each image file and read its data.
    for (const imageFile of imageFiles) {
      const img = fs.readFileSync(imageFile.path);
      if (img === undefined) {
        console.log(`Unable to read file: ${imageFile.path}`);
      } else {
        images.push({
          data: img,
          contentType: imageFile.originalname,
        });
      }
    }

    for (const productDetail of bodyData?.productDetails) {
      {
        productDetailArrayValue.push({
          pickedProductDetailsSize: productDetail.pickedProductDetailsSize,
          pickedProductDetailsColor: productDetail.pickedProductDetailsColor,
          productDetailsQuantity: productDetail.productDetailsQuantity,
        });
      }
    }

    // console.log(productDetails);
    // Create the product with the 'images' array.
    const result = await addProduct.create({
      images: images, // This will store an array of image data and content types.
      name: bodyData.name,
      productDetails: productDetailArrayValue,
    });
    return result;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};
