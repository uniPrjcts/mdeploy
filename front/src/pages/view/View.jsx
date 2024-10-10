import './view.css';

const View = () => {
    return (
        <div className="view">
            <AdminSidebar />
            <div className="vContainer">
                <AdminNavbar />
                View
            </div>
        </div>
    );
};

export default View;
