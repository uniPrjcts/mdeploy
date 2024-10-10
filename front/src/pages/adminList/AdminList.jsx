import AdminNavbar from '../../components/adminNavbar/AdminNavbar';
import AdminSidebar from '../../components/adminSidebar/AdminSidebar';
import Datatable from '../../components/datatable/Datatable';
import './adminList.css';

const AdminList = ({ columns }) => {
    return (
        <div className="aList">
            <AdminSidebar />
            <div className="aContainer">
                <AdminNavbar />
                <Datatable columns={columns} />
            </div>
        </div>
    );
};

export default AdminList;
