import express from "express";
import { generateLink, getQuestion, saveQuestion } from "../controllers/index.controllers.js";
const router = express.Router();

router.post("/generatelink", generateLink);
router.post("/savequestion", saveQuestion);
router.get("/getquestion",getQuestion);

export default router;
