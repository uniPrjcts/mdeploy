import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Hotel from "./pages/hotel/Hotel";
import Login from "./pages/login/Login";
import AdminHome from "./pages/adminHome/AdminHome";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Register from "./pages/register/Register";
import AdminList from "./pages/adminList/AdminList";
import New from "./pages/new/New";
import { hotelsColumns, quartosColumns, reservaColumns, userColumns } from "./components/datatable/Datatablemodel";

function App() {

    const ProtectedRoute = ({ children }) => {
        const { user } = useContext(AuthContext);

        // idea: fazer /register ser protected caso haja user
        if (!user) {
            return <Navigate to="/login" />;
        }

        if (!user.isAdmin) {
            return <Navigate to="/" />;
        }

        return children;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
                <Route path="/admin/users">
                    <Route index element={<ProtectedRoute><AdminList columns={userColumns} /></ProtectedRoute>} />
                    <Route path="new" element={<New />} />
                </Route>
                <Route path="/admin/hotels">
                    <Route index element={<ProtectedRoute><AdminList columns={hotelsColumns} /></ProtectedRoute>} />
                    <Route path="new" element={<New />} />
                </Route>
                <Route path="/admin/quartos">
                    <Route index element={<ProtectedRoute><AdminList columns={quartosColumns} /></ProtectedRoute>} />
                    <Route path="new" element={<New />} />
                </Route>
                <Route path="/admin/reservas">
                    <Route index element={<ProtectedRoute><AdminList columns={reservaColumns} /></ProtectedRoute>} />
                    <Route path="new" element={<New />} />
                </Route>
                <Route path="/" element={<Home />} />
                <Route path="/hotels" element={<List />} />
                <Route path="/hotels/:id" element={<Hotel />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
