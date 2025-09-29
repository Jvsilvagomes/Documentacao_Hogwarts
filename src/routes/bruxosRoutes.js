import express from "express";
import { getAllBruxos, getBruxosById, createBruxo, deleteBruxo} from "../controllers/bruxosController.js";

const router = express.Router();

router.get("/", getAllBruxos);
router.get("/:id", getBruxosById);
router.post("/", createBruxo);
router.delete("/:id", deleteBruxo);

export default router;