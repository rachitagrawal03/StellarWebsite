import express from "express"
import { addProduct, allProduct, removeProduct, newCollection, relatedProducts, popularInMen, productData} from "../controllers/productController.js"
import { upload } from "../middleware/multer.js";

const productRouter = express.Router();

productRouter.post("/add", upload.single('image'), addProduct)
productRouter.get("/list", allProduct)
productRouter.post("/remove", removeProduct)
productRouter.get("/newcollection", newCollection)
productRouter.get("/relatedproducts", relatedProducts)
productRouter.get("/popularinmen", popularInMen)
productRouter.get("/:id", productData)

export default productRouter;