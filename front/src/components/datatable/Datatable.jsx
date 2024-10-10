import "./datatable.css";
import { DataGrid } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useFetch from '../../hooks/useFetch.js';
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Datatable = ({ columns }) => {
    const location = useLocation();
    const path = location.pathname.split("/").pop();
    const { data, loading, error } = useFetch(`/api/${path}`);
    const [list, setList] = useState();

    useEffect(() => {
        setList(data);
    }, [data]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/${path}/${id}`);
            setList(list.filter((item) => item._id !== id));
        } catch (err) {
            console.log("Erro na deleção!");
        }
    }

    const actionColumn = [
        {
            field: "action", headerName: "Opções", width: 200, renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <div className="viewButton"><FontAwesomeIcon icon={faEye} /></div>
                        <div className="deleteButton"><FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(params.row._id)} /></div>
                    </div>
                )
            }
        }
    ];

    return (
        <div className="datatable">
            <DataGrid
                rows={list}
                columns={columns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
                disableRowSelectionOnClick
                getRowId={row => row._id}
            />
        </div>
    );
};

export default Datatable;
