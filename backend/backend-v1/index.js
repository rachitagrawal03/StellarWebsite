const port = 4000; // on this port our server will run

const express = require("express"); // importing express

const app = express(); // creating our app instance

const mongoose = require("mongoose"); // initializing mongoose package to connect to mongoDB

const jwt = require("jsonwebtoken"); // initializing the json web token for user authentication

const multer = require("multer"); // multer is require to store data on the backend server

const path = require("path"); // initializing the path module to get access to our backend directory in express server

const cors = require("cors"); // to allow our app to connect with our server 

app.use(express.json()); // will convert the response that we get in json form

app.use(cors()); // use cors our react app will connect with our express server on 4000 port

import dotenv from "dotenv";
dotenv.config(); 

// database connection with mongoDB
mongoose.connect(process.env.MONGODB_URI)

// api creation
app.get("/", (req, res) =>{
    res.send("My Express App Is Running");
})

// Image Storage Engine

const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage});

// Creating upload endpoint for images
app.use("/images", express.static("upload/images"))
app.post("/upload", upload.single('product'), (req, res)=>{
    res.json({
        success: 1,
        image_url: `https://shopperwebsite-gn7e.onrender.com/images/${req.file.filename}`
    })
})

// Schema for creating products

const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    new_price:{
        type: Number,
        required: true,
    },
    old_price:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    available:{
        type: Boolean,
        default: true,
    }
})

// creating endpoint for adding products in the database
app.post('/addproduct', async(req, res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0)
    {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else{
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    })
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success: true,
        name: req.body.name,
    })
})


// creating api/endpoint for removing/deleting products in the database
app.post("/removeproduct", async(req, res) =>{
    await Product.findOneAndDelete({id: req.body.id});
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    })  
})


// creating API for getting all products
app.get('/allproducts', async(req, res)=>{
    let products = await Product.find({});
    console.log("All products fetched");
    res.send(products);
})


// creating schema for user model
const Users = mongoose.model('Users', {
    name:{
        type: String,
    },
    email:{
        type: String,
        unique: true,
    },
    password:{
        type: String,
    },
    cartData:{
        type: Object,
    },
    date:{
        type: Date,
        default: Date.now,
    }
})

// creating endpoint for registering the user
app.post('/signup', async(req, res) => {
    let check = await Users.findOne({email: req.body.email});
    if(check){
        return res.status(400).json({success: false, errors: "exisiting user found with same mail id"})
    }
    let cart = {};
    for(let i = 0; i< 300; i++){
        cart[i] = 0;
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    await user.save();

    const data = {
        user:{
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({success: true, token})
})

// creating endpoint for user login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({email: req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user:{
                    id: user.id
                }
            }
            const token = jwt.sign(data, "secret_ecom");
            res.json({success: true, token})
        } else{
            res.json({success: false, errors: "Wrong Password"})
        }
    } else{
        res.json({success: false, errors: "Wrong Email Id"})
    }
})

// creating endpoint for new collections data
app.get('/newcollection', async(req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("New Collection Fetched"); 
    res.send(newcollection);
})

// creating endpoint for popular in men data
app.get('/popularinmen', async (req, res) => {
    let products = await Product.find({category: "men"});
    let popular_in_men = products.slice(0, 4);
    console.log("Popular In Men Products Fetched");
    res.send(popular_in_men);
})

// creating middleware to fetch user based on auth token
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors: "Please authenticate valid token"})
    }else{
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({errors: "Please authenticate valid token"})    
        }
    }
}

// creating endpoint for adding products in cartData
app.post('/addtocart', fetchUser, async(req, res) => {
    console.log("Added:", req.body, req.user); 
    let userData = await Users.findOne({_id: req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData})
    res.send(` Id ${req.body.itemId} product has been added in the cart`)
})

// creating endpoint to remove the product from cartData
app.post('/removefromcart', fetchUser, async(req, res)=>{
    console.log("Removed", req.body, req.user); 
    let userData = await Users.findOne({_id: req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData})
    res.send(` Id ${req.body.itemId} product has been removed from the cart`)
})

// creating endpoint to get cart data
app.post('/getcartdata', fetchUser, async(req, res) =>{
    console.log(`getting ${req.user} user cart data...`); 
    let userData = await Users.findOne({_id: req.user.id});
    res.json(userData.cartData);
})

// creating endpoint to get product data from its id
app.get('/product/:id', async(req, res) =>{
    try {
        console.log("trying to find the product");
        const product = await Product.findOne({id: req.params.id});
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
})


// creating schema for subscriber model
const Subscribers = mongoose.model('Subscribers', {
    email:{
        type: String,
        unique: true,
    },
    date:{
        type: Date,
        default: Date.now,
    }
})

// creating api endpoint for saving newsletter subscribers data
app.post('/subscribe', async(req, res) => {
    let check = await Subscribers.findOne({email: req.body.email});
    if(check){
        return res.status(400).json({success: false, errors: "exisiting email found"})
    }

    const subscriber = new Subscribers({
        email: req.body.email,
    })

    await subscriber.save();
    res.json({success: true, subscriber})
})

app.listen(port, (error)=>{
    if(!error){
        console.log("Server Running On Port " + port);
    } else {
        console.log("Error: " + error);
    }
})

