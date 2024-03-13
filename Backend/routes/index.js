import express from "express";
import questionRoute from "./question.routes.js";

const router = express.Router();

router.use("/quiz", questionRoute);


export default router;
