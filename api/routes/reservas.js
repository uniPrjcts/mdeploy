import express from "express";
import { atualizarReserva, criarReserva, deletarReserva, getReserva, getReservas, getReservasByHotel, getReservasByQuarto } from "../controllers/reserva.js";

const router = express.Router();

//Criar reserva
router.post("/", criarReserva);
//Atualizar reserva
router.put("/:id", atualizarReserva);
//Deletar reserva
router.delete("/:id", deletarReserva);
//Get reserva
router.get("/:id", getReserva);
//Get reservas
router.get("/", getReservas);
//Get reservas by Hotel
router.get("/hotel/:hotelid", getReservasByHotel);
//Get reservas by quarto
router.get("/quarto/:quartoid", getReservasByQuarto);

export default router;
