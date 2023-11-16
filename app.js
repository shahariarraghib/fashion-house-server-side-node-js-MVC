const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const allowedOrigins = ["https://fashion-house-client-side-nextjs.vercel.app"];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
// thard party middleWare
app.use(cors());
app.use(express.json());
app.use(cors(corsOptions));
// route

const userRoute = require("./routes/userInfoRoute");
const productAddRoute = require("./routes/productaddRoute");
// const employeeRoute = require("./routes/employee.route");
// const companyRoute = require("./routes/companyAccount.route");

app.use("/user", userRoute);
app.use("/product", productAddRoute);
// app.use("/app/v1/employee", employeeRoute);
// app.use("/app/v1/company", companyRoute);

app.get("/", (req, res) => {
  res.send("Fashion House surver is connected!!");
});

module.exports = app;
