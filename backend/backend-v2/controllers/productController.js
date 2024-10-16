import productModel from "../models/productModel.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from 'fs'

// add product
const addProduct = async (req, res) => {
    try {
        const localFilePath = req.file.path; // The file uploaded locally by Multer
        const cloudinaryResponse = await uploadOnCloudinary(localFilePath); // Upload to Cloudinary
        // console.log(cloudinaryResponse);

        if (!cloudinaryResponse) {
            return res.status(500).json({ success: false, message: "Image upload failed" });
        }

        // Now that the image is uploaded to Cloudinary, get the URL
        const imageUrl = cloudinaryResponse.secure_url;

        // Generate product ID
        let products = await productModel.find({});
        let id;
        if (products.length > 0) {
            let last_product = products[products.length - 1];
            id = last_product.id + 1;
        } else {
            id = 1;
        }

        // Create new product with Cloudinary image URL
        const product = new productModel({
            id: id,
            name: req.body.name,
            image: imageUrl, // Store the Cloudinary image URL here
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });

        await product.save(); // Save the product in MongoDB
        // console.log("Product saved with Cloudinary image URL");

        // Delete the local file after upload
        fs.unlinkSync(localFilePath);

        res.json({
            success: true,
            message: "Product Added",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};


// all products
const allProduct = async(req, res) => {
    try {
        const products = await productModel.find({});
        console.log("All products fetched");
        res.send({
            success: true,
            data: products
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
    }
}

// remove product in the database
const removeProduct = async (req, res) => {
    try {
        console.log(req.body.id);
        const product = await productModel.findOne({id: req.body.id});
        // console.log(id);
        fs.unlink(`uploads/${product.image}`, ()=>{})
        console.log(product);
        await productModel.findOneAndDelete({id: req.body.id})
        res.json({
            success: true,
            message: `${req.body.id} product has been removed from product model`,
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
    }
}


// new collections data
const newCollection = async (req, res) => {
    try {
        let products = await productModel.find({});
        let newcollection = products.slice(1).slice(-8);
        console.log("New Collection Fetched"); 
        // res.send(newcollection)
        res.json({
            success: true,
            data: newcollection,
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
    }
}

// related products data
const relatedProducts = async (req, res) => {
    try {
        let products = await productModel.find({category: "men"});
        let related_products = products.slice(0, 4);
        console.log("Related Products Fetched"); 
        res.json({
            success: true,
            data: related_products,
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
    }
}

const popularInMen = async(req, res) => {
    try {
        let products = await productModel.find({category: "men"});
        let popular_in_men = products.slice(0, 4);
        console.log("Popular In Men Products Fetched");
        // res.send(popular_in_men);
        res.json({
            success: true,
            data: popular_in_men,
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
    }
}

const productData = async(req, res) => {
    try {
        console.log("trying to find the product with ID:", req.params.id);
        const product = await productModel.findOne({id: req.params.id});
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
      } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).json({ error: err.message });
      }
}

export {addProduct, allProduct, removeProduct, newCollection, relatedProducts, popularInMen, productData};

