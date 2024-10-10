import './register.css';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import FormField from "../../components/forms/FormField";
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "REGISTER_START" });

        const username = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        try {
            const res = await axios.post('/api/auth/register', { username, email, senha });

            dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
            alert("Usuário criado com sucesso!");
            navigate("/login");
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data });
        }
    }

    return (
        <div className="register-page">
            <Navbar />
            <div className="register">
                <h2>Registrar</h2>
                <form className="register-form">
                    <FormField
                        type="text"
                        id="nome"
                        placeholder="Digite seu nome"
                        label="Nome:"
                        required={true}
                    />
                    <FormField
                        type="email"
                        id="email"
                        placeholder="Digite seu email"
                        label="Email:"
                        required={true}
                    />
                    <FormField
                        type="password"
                        id="senha"
                        placeholder="Digite sua senha"
                        label="Senha:"
                        required={true}
                    />
                    <button onClick={handleClick}>Registrar</button>
                </form>
                <p className="linkLogin">
                    Já tem conta?{" "}
                    <span onClick={() => navigate("/login")}>Login</span>
                </p>
            </div>
        </div>
    );
};

export default Register;
