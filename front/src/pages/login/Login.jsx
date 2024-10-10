import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import Navbar from "../../components/navbar/Navbar";
import FormField from "../../components/forms/FormField";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        senha: "",
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("/api/auth/login", credentials);


            if (res.data.isAdmin) {
                navigate("/admin");
                dispatch({ type: "LOGIN_SUCCESS", payload: { ...res.data.details, isAdmin: res.data.isAdmin } });
            } else {
                navigate("/");
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            }
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data });
        }
    };

    return (
        <div className="login">
            <Navbar />
            <div className="titulo"><h2>Login</h2></div>
            <div className="lContainer">
                <FormField
                    type="text"
                    id="username"
                    placeholder="username"
                    label="Username:"
                    required={true}
                    onChange={handleChange}
                />
                <FormField
                    type="password"
                    id="senha"
                    placeholder="senha"
                    label="Senha:"
                    required={true}
                    onChange={handleChange}
                />
                <button onClick={handleClick} className="lButton">
                    Login
                </button>
                {error && <span className="erro">{error.message}</span>}
            </div>
            <p className="linkRegister">
                Não tem conta?{" "}
                <span onClick={() => navigate("/register")}>Faça registro</span>
            </p>
        </div>
    );
};

export default Login;
