import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './adminNavbar.css';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const AdminNavbar = () => {
    return (
        <div className="adminNavbar">
            <div className="anWrapper">
                <div className="aSearch">
                    <input type="text" placeholder='Pesquisar' className='iaSearch' />
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='icon' />
                </div>
            </div>
        </div>
    );
};

export default AdminNavbar;
