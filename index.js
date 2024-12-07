import express from "express";
import "dotenv/config";
import dbconnect from "./Database/dbConnect.js";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/user.route.js"
import productRouter from "./Routes/product.route.js";
import cartRouter from "./Routes/cart.route.js";
import auth from "./Middelwares/auth.middelware.js";
import orderRouter from "./Routes/order.route.js";

let server = express();

let port = process.env.PORT || 3000;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());


// Api Routes 

server.use("/users" , userRouter);
server.use("/products", productRouter);
server.use("/cart",cartRouter,auth)
server.use("/order",orderRouter)


dbconnect()
  .then(() => {
    console.log("Database  is connected ");

    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(" DataBase error ", err);
  });
  // PORT=8000
  // MONGO_DBURI='mongodb+srv://arpitjain:12345@cluster0.snbpgwa.mongodb.net/'
  // ACCESS_KEY="ThisisSecretAcccessKey"
  // ACCESS_EXPIRY="1d"
  // REFRESH_EXPIRY='10d'
  // REFRESH_KEY="THISISSECRETREFRESHKEY"
  // CLOUDINARY_CLOUD_NAME="dvit6fss4"
  // CLOUDINARY_API_KEY="749893643832817"
  // CLOUDINARY_API_SECRET="kkyym-TiTGHogQ8rfYaHw6gz5C8"