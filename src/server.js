import express from "express";
// lấy tham số từ client trả về server. VD/user?id=7
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";

// gọi tới config của thư viện dotenv để có thể process.env.
require('dotenv').config();

// tạo 1 instance của express
let app = express();

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
viewEngine(app);
initWebRoutes(app);

// connectDB
connectDB();

// lấy ra từ file env
let port = process.env.PORT || 6969;
app.listen(port, () => {
    console.log("Backend Nodejs is running on port " + port)
})