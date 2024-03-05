import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { publicRequest } from "../../requestMethods";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function UserList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [staffID, setStaffID] = useState(null);

  const generatePDF = () => {
    const pdf = new jsPDF("landscape");

    // Set the title of the document
    pdf.text("Aim Tasker Staff Report", 15, 15);

    // Set column headers
    const headers = [
      "ID",
      "Full Name",
      "PHONE",
      "Staff ID",
      "EMAIL",
      "ADDRESS",
      "GENDER",
    ];

    // Set data for the table
    const tableData = data.map((item) => [
      item._id,
      item.fullname,
      item.phone,
      item.staffID,
      item.email,
      item.address,
      item.gender,
    ]);

    // Auto page breaks and table styling
    pdf.autoTable({
      startY: 20,
      head: [headers],
      body: tableData,
      styles: {
        fontSize: 10,
        cellWidth: "wrap",
      },
      margin: { top: 20 },
    });

    // Save the PDF with a specific name
    pdf.save("staffs_report.pdf");
  };

  const delelePemantly = async (e) => {
    e.preventDefault();
    if (staffID) {
      try {
        await publicRequest.delete(`/users/${staffID}`);
        window.location.reload();
      } catch (error) {
        console.error("Error deleting shift:", error);
      } 
    }
  };
  const handleDelete = async(id) => {
    setOpen(!open)
    setStaffID(id)
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  useEffect(() => {
    const getItems = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.get("/users");
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getItems();
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", width: 150 },
    { field: "fullname", headerName: "Full Name", width: 150 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "staffID", headerName: "StaffID", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "address", headerName: "Address", width: 100 },

    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">View</button>
            </Link>

            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <h3 className="incidences-header">All Staffs</h3>
      <Link to="/newuser">
      <button className="new-shift">New Staff</button>
      </Link>
      <button onClick={generatePDF} className="generatepdf">Generate Pdf</button>
      {loading ? (
        <span>Loading ...</span>
      ) : (
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={20}
          checkboxSelection
        />
      )}

      {open && (
        <div className="modal">
          <span className="modal-header">Are you sure you want to delete?</span>
          <div className="cancel-delete">
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={delelePemantly}>Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
}
