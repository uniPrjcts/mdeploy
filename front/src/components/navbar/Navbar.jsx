import { useContext } from "react";
import "./navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const disponivel = location.pathname !== '/login' && location.pathname !== '/register';

    const handleClick = (type) => {
        if (type === "s") {
            navigate("/register");
            return;
        }
        navigate("/login");
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const handleUsernameClick = () => {
        if (user && user.isAdmin) {
            navigate("/admin");
        }
    };

    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                    <span className="logo">massante</span>
                </Link>
                {user ? (
                    <div className="navItems">
                        <span className="navUser" onClick={handleUsernameClick} style={{ cursor: user.isAdmin ? "pointer" : "default" }}>
                            {user.username}
                        </span>
                        <button className="navButton" onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    disponivel && (
                        <div className="navItems">
                            <button className="navButton" onClick={() => handleClick("s")}>Sign up</button>
                            <button className="navButton" onClick={() => handleClick("l")}>Login</button>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Navbar;
