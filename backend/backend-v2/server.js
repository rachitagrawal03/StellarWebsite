import express, { Router } from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import productRouter from "./routes/productRoute.js";
import subscribeRouter from "./routes/subscribeRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import 'dotenv/config'
import orderRouter from "./routes/orderRoute.js";



//  app config
const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();

// api endpoints
app.use("/api/product", productRouter)
app.use("/images", express.static("uploads"))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/subscribe", subscribeRouter)
app.use("/api/order", orderRouter)


app.get("/", (req, res)=>{
    res.send("API working");
})

app.listen(PORT, ()=>{
    console.log(`Server started on: http://localhost:${PORT}`);
})

