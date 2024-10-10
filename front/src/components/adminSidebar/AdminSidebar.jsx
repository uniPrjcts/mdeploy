import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './adminSidebar.css';
import { faArrowRightFromBracket, faBed, faCashRegister, faHotel, faTable, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const AdminSidebar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="adminSidebar">
            <div className="top">
                <span className="logoAdmin" onClick={() => navigate("/")}>massante</span>
            </div>
            <div className="center">
                <ul>
                    <p className="titleAdmin">Geral</p>
                    <li onClick={() => navigate("/admin")}>
                        <FontAwesomeIcon icon={faTable} className="iconAdmin" />
                        <span>Dashboard</span>
                    </li>
                    <p className="titleAdmin">Editar</p>
                    <li onClick={() => navigate("/admin/users")} >
                        <FontAwesomeIcon icon={faUsers} className="iconAdmin" />
                        <span>Usuários</span>
                    </li>
                    <li onClick={() => navigate("/admin/hotels")} >
                        <FontAwesomeIcon icon={faHotel} className="iconAdmin" />
                        <span>Hotéis</span>
                    </li>
                    <li onClick={() => navigate("/admin/quartos")} >
                        <FontAwesomeIcon icon={faBed} className="iconAdmin" />
                        <span>Quartos</span>
                    </li>
                    <li onClick={() => navigate("/admin/reservas")}>
                        <FontAwesomeIcon icon={faCashRegister} className="iconAdmin" />
                        <span>Reservas</span>
                    </li>
                </ul>
            </div>
            <div className="bottom">
                <ul>
                    <p className="titleAdmin">Log out</p>
                    <li onClick={handleLogout}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className="iconAdmin" />
                        <span>Log out</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AdminSidebar;
