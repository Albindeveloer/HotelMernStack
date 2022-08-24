import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { hotelColumns, userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import UseFetch from "../../hooks/UseFetch";
import { useEffect } from "react";
import axios from "axios";

const Datatable = ({columns}) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list,setList]=useState([])

  const {data,loading}=UseFetch(`/${path}`);
  console.log(data)

  useEffect(()=>{
    setList(data)
  },[data])

  const handleDelete = async(id) => {
    try{
      await axios.delete(`/${path}/${id}`)
      setList(list.filter((item) => item._id !== id));

    }catch(err){
      
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Deletee
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list?list:""}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={(row) => row._id}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
