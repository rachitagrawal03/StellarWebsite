import express from "express"
import { addProduct, allProduct, removeProduct, newCollection, relatedProducts, popularInMen, productData} from "../controllers/productController.js"
import multer from "multer"

const productRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb)=>{
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage:storage});

productRouter.post("/add", upload.single('image'), addProduct)
productRouter.get("/list", allProduct)
productRouter.post("/remove", removeProduct)
productRouter.get("/newcollection", newCollection)
productRouter.get("/relatedproducts", relatedProducts)
productRouter.get("/popularinmen", popularInMen)
productRouter.get("/:id", productData)

export default productRouter;