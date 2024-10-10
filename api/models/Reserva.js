import mongoose from "mongoose";

const ReservaSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  quartoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quarto',
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  username: {
    type: String,
    ref: 'User',
  },
  nome: {
    type: String,
    ref: 'Hotel',
  },
  titulo: {
    type: String,
    ref: 'Quarto',
  },
}, { timestamps: true });

export default mongoose.model('Reserva', ReservaSchema);
