import express from "express";
import { atualizarQuarto, atualizarQuartoDisponibilidade, criarQuarto, deletarQuarto, getQuarto, getQuartos } from "../controllers/quartos.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Criar quarto
router.post("/:hotelid", verifyAdmin, criarQuarto);
// Atualizar quarto
router.put("/:id", verifyAdmin, atualizarQuarto);
router.put("/disponibilidade/:id", atualizarQuartoDisponibilidade);
// Deletar quarto
router.delete("/:id/:hotelid", verifyAdmin, deletarQuarto);
// Get quarto
router.get("/:id", getQuarto);
// Get todos quartos
router.get("/", getQuartos);

export default router;
