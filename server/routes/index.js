import express from "express";
import { getImage } from "../controller/media.controller.js";

const router = express.Router();

router.get("/media/image", getImage);

export { router };
