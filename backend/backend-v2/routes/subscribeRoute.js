import express from "express";
import { subscribeNewsletter } from "../controllers/subscribeController.js";

const subscribeRouter = express.Router();

subscribeRouter.post("/newsletter", subscribeNewsletter);

export default subscribeRouter;