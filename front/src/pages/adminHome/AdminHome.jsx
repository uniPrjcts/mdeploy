import AdminSidebar from '../../components/adminSidebar/AdminSidebar.jsx';
import AdminNavbar from '../../components/adminNavbar/AdminNavbar.jsx';
import './adminHome.css';

const AdminHome = () => {
    return (
        <div className="aHome">
            <AdminSidebar />
            <div className="ahContainer">
                <AdminNavbar />
            </div>
        </div>
    );
};

export default AdminHome;
