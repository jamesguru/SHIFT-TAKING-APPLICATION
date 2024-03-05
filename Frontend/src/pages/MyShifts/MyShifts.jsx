import { DataGrid } from "@mui/x-data-grid";
import "./myshifts.css";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { publicRequest } from "../../requestMethods";

const Shifts = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const getShifts = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.post("/shifts/me", {
          email: user.currentUser.email,
        });
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getShifts();
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "time", headerName: "Time", width: 150 },
    { field: "location", headerName: "Location", width: 150 },
    { field: "type", headerName: "Type", width: 120 },
    { field: "duration", headerName: "Duration", width: 120 }, 
    { field: "notes", headerName: "Notes", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/shift/" + params.row._id}>
              <button className="userListEdit">View</button>
            </Link>

            
          </>
        );
      },
    },
  ];

  return (
    <div className="myshifts">
      <Link to="/staff">
        <span className="myshifts_back">
          <FaArrowLeft /> Back
        </span>
      </Link>

      <div className="myshifts_top">
        <span className="myshifts_header">Name: John Doe</span>
        <span className="myshifts_header">All/Past shifts</span>
      </div>

      <div>
        {loading ? (
          <span>Loading ...</span>
        ) : (
          <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
        checkboxSelection
      />
        )}
      </div>
    </div>
  );
};

export default Shifts;
