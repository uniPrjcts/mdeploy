import Reserva from "../models/Reserva.js";
import Quarto from "../models/Quarto.js";
import mongoose from "mongoose";

export const criarReserva = async (req, res, next) => {
    const { userId, quartoId, checkIn, checkOut, username, nome, titulo } = req.body;

    try {
        if (!userId || !quartoId || !checkIn || !checkOut || !username || !nome || !titulo) {
            return res.status(400).json({ message: 'Dados incompletos' });
        }

        const reservasExistentes = await Reserva.find({
            quartoId,
            $or: [
                { checkIn: { $lt: checkOut, $gte: checkIn } },
                { checkOut: { $gt: checkIn, $lte: checkOut } },
            ],
        });

        if (reservasExistentes.length > 0) {
            return res.status(400).json({ message: "Este quarto já está reservado para as datas selecionadas." });
        }

        const novaReserva = new Reserva({ userId, quartoId, checkIn, checkOut, username, nome, titulo });
        const reservaSalva = await novaReserva.save();

        res.status(200).json(reservaSalva);
    } catch (err) {
        next(err);
    }
};

export const atualizarReserva = async (req, res, next) => {
    try {
        const reservaAtualizada = await Reserva.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        res.status(200).json(reservaAtualizada);
    } catch (error) {
        next(error);
    }
};

export const deletarReserva = async (req, res, next) => {
    try {
        await Reserva.findByIdAndDelete(req.params.id);

        res.status(200).json("Reserva deletada com sucesso");
    } catch (error) {
        next(error);
    }
};

export const getReserva = async (req, res, next) => {
    try {
        const reservas = await Reserva.find(req.body)
            .populate('userId', 'username')
            .populate('quartoId', 'titulo')
            .lean();

        const formattedReservas = reservas.map(reserva => ({
            ...reserva,
            username: reserva.userId ? reserva.userId.username : 'Indisponível',
            titulo: reserva.quartoId ? reserva.quartoId.titulo : 'Indisponível',
            nome: reserva.nome || 'Indisponível'
        }));

        res.status(200).json(formattedReservas);
    } catch (error) {
        next(error);
    }
};

export const getReservas = async (req, res, next) => {
    try {
        const reservas = await Reserva.find()
            .populate('userId', 'username')
            .populate('quartoId', 'titulo')
            .lean();

        const formattedReservas = reservas.map(reserva => ({
            ...reserva,
            username: reserva.userId ? reserva.userId.username : 'Indisponível',
            titulo: reserva.quartoId ? reserva.quartoId.titulo : 'Indisponível',
            nome: reserva.nome || 'Indisponível'
        }));

        res.status(200).json(formattedReservas);
    } catch (error) {
        next(error);
    }
};

export const getReservasByHotel = async (req, res, next) => {
    const hotelId = req.params.hotelId;

    try {
        const quartos = await Quarto.find({ hotelId });
        const quartosIds = quartos.map(quarto => quarto._id);
        const reservas = await Reserva.find({ quartoId: { $in: quartosIds } });

        res.status(200).json(reservas);
    } catch (error) {
        next(error);
    }
};

export const getReservasByQuarto = async (req, res, next) => {
    const quartoId = req.params.quartoId;

    try {
        const reservas = await Reserva.find({ quartoId }).populate(quartoId);

        res.status(200).json(reservas);
    } catch (error) {
        next(error);
    }
}
