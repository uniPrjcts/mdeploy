import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.senha, salt);

        const novoUsuario = new User({
            ...req.body,
            senha: hash,
        })

        await novoUsuario.save();
        res.status(200).send("Usuário criado com sucesso");
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {

        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "Usuário não encontrado."));

        const isSenhaCorreta = await bcrypt.compare(req.body.senha, user.senha);
        if (!isSenhaCorreta) return next(createError(400, "Senha ou usuário incorretos."));

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);

        const { senha, isAdmin, ...otherDetails } = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
        })
            .status(200)
            .json({ details: { ...otherDetails }, isAdmin });
    } catch (err) {
        next(err);
    }
};
