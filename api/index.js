import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import quartosRoute from "./routes/quartos.js";
import reservasRoute from "./routes/reservas.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8800
// Utilização do dotenv para ocultar informações sensíveis
dotenv.config();

// Conexão inicial a database no mongo
const connect = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Conectado ao Mongo");
    } catch (error) {
        throw error;
    }
};

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200
  };

  app.use(cors(corsOptions));

// Middlewares
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/quartos", quartosRoute);
app.use("/api/reservas", reservasRoute);

app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Alguma coisa pifou!";
    return res.status(errorStatus).json({
        sucess: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

// Expondo o app a tal port. Se ela estiver ocupada, selecione outra
app.listen(port, () => {
    connect();
    console.log("Conectado ao backend!");
});
