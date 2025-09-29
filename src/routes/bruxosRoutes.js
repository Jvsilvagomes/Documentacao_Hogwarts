import express from "express";
import { getAllBruxos, getBruxosById, createBruxo} from "../controllers/bruxosController.js";

const router = express.Router();

router.get("/", getAllBruxos);
router.get("/:id", getBruxosById);
router.post("/", createBruxo);

export default router;