import express from "express";
import { atualizarUser, deletarUser, getUser, getUsers } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// Atualizar User
router.put("/:id", verifyUser, atualizarUser);
// Deletar User
router.delete("/:id", verifyUser, deletarUser);
// Get User
router.get("/:id", verifyUser, getUser);
// Get todos Users
router.get("/", verifyAdmin, getUsers);

export default router;
