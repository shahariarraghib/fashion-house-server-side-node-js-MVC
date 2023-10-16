const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

// Define the Address Schema
const addressSchema = new mongoose.Schema({
  contactNumber: Number,
  street: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,
  addressDetails: String,
});

// Define the BankInfo Schema
const bankInfoSchema = new mongoose.Schema({
  accountNumber: String,
  bankName: String,
  routingNumber: String,
});

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      validate: [validator.isEmail, "provide a valid Email"],
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email address is required"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      // validate: {
      //   validator: (value) =>
      //     validator.isStrongPassword(value, {
      //       // minLength: 6,
      //     }),
      //   message: "Password {VALUE} is not strong",
      // },
    },
    confirmPassword: {
      type: String,
      required: [true, "please Confirm your password"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Password don't match",
      },
    },

    userType: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    username: {
      type: String,
      required: [true, "please provide your user name"],
      unique: [true, "name must be unique"],
      minLength: [3, "company must be at list 3 characters"],
      maxLength: [100, "name is to long"],
    },

    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
    },

    imgURL: {
      type: String,
      validate: [validator.isURL, "plice provide a valid url"],
    },

    address: addressSchema, // Embed the address subdocument
    bankInfo: bankInfoSchema, // Embed the bank info subdocument
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },

  { timestamps: true }
);

// password hashing
userSchema.pre("save", function (next) {
  const password = this.password;
  const hashedPassword = bcryptjs.hashSync(password);
  this.password = hashedPassword;
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.comparePassword = function (password, hash) {
  const isPasswordValid = bcryptjs.compareSync(password, hash);
  return isPasswordValid;
};

const user = mongoose.model("user", userSchema);
module.exports = user;
