import "./client.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ClientList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [clientID,setClientID] = useState(null);
  const generatePDF = () => {
    const pdf = new jsPDF("landscape");

    // Set the title of the document
    pdf.text("Aim Tasker Clients Report", 15, 15);

    // Set column headers
    const headers = [
      "ID",
      "Full Name",
      "PHONE",
      "ADDRESS",
      "GENDER",
      "Note",
    ];

    // Set data for the table
    const tableData = data.map((item) => [
      item._id,
      item.fullname,
      item.phone,
      item.address,
      item.gender,
      item.desc,
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
    pdf.save("clients_report.pdf");
  };
  useEffect(() => {
    const getItems = async () => {
      try {
        setLoading(true)
        const res = await publicRequest.get("/clients");
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    
    getItems();
  }, []);

  const handleDelete = async(id) => {
   setOpen(!open);
   setClientID(id);
  };

  const delelePemantly = async (e) => {
    e.preventDefault();
    
    if(clientID){
      try {
        await publicRequest.delete(`/clients/${clientID}`);
        window.location.reload();
      } catch (error) {
        console.error("Error deleting shift:", error);
      }
    }
  }

  const handleCancel = (e) =>{
    e.preventDefault();
    setOpen(!open)
  }

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    { field: "fullname", headerName: "Full Name", width: 150 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "address", headerName: "address", width: 200 },
    { field: "desc", headerName: "Note", width: 200 },
    
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/client/" + params.row._id}>
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
      <h3 className="incidences-header">All Clients</h3>
      <Link to="/newclient">
      <button className="new-shift">New Client</button>
      </Link>
      <button onClick={generatePDF} className="generatepdf">Generate Pdf</button>
     { loading ? <span>Loading...</span>:<DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />}

      {open && <div className="modal">
        <span className="modal-header">Are you sure you want to delete?</span>
        <div className="cancel-delete">
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={delelePemantly}>Confirm</button>
        </div>
      </div>}
    </div>
  );
}
