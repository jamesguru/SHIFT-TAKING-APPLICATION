import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./productList.css";

export default function ProductList() {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [shiftID, setShiftID] = useState(null);

  // Filter state variables
  const [filterStaffEmail, setFilterStaffEmail] = useState("");
  const [filterClient, setFilterClient] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  useEffect(() => {
    const getShifts = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.get("/shifts");
        setOriginalData(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching shifts:", error);
        setLoading(false);
      }
    };
    getShifts();
  }, []);

// ... (previous code)

useEffect(() => {
  // Filter the data locally based on the filter values
  const filteredData = originalData.filter((item) => {
    const matchesStaffEmail =
      !filterStaffEmail ||
      (item.staffEmail &&
        item.staffEmail.toLowerCase().includes(filterStaffEmail.toLowerCase()));
    const matchesClient =
      !filterClient ||
      (item.client &&
        item.client.toLowerCase().includes(filterClient.toLowerCase()));
    const matchesLocation =
      !filterLocation ||
      (item.location &&
        item.location.toLowerCase().includes(filterLocation.toLowerCase()));

    // Check if the date is within the specified range
    const startDate = filterStartDate ? parseDate(filterStartDate) : null;
    const endDate = filterEndDate ? parseDate(filterEndDate) : null;
    const itemDate = parseDate(item.date);
    const matchesDate =
      (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate);

    return matchesStaffEmail && matchesClient && matchesLocation && matchesDate;
  });

  setFilteredData(filteredData);
}, [
  filterStaffEmail,
  filterClient,
  filterStartDate,
  filterEndDate,
  filterLocation,
  originalData,
]);

// ... (rest of the code)

// Helper function to parse DD/MM/YY format to YYYY-MM-DD
const parseDate = (dateString) => {
  const [day, month, year] = dateString.split("/");
  return `20${year}-${month}-${day}`;
};


  const generatePDF = () => {
    const pdf = new jsPDF("landscape");
    // Set the title of the document
    pdf.text("Aim Tasker Shifts Report", 15, 15);

    // Set column headers
    const headers = [
      "ID",
      "DATE",
      "TIME",
      "LOCATION",
      "CLIENT",
      "DURATION",
      "STAFF",
      "DISTANCE",
    ];

    // Set data for the table
    const tableData = filteredData.map((item) => [
      item._id,
      item.date,
      item.time,
      item.location,
      item.client,
      item.duration,
      item.staffEmail,
      item?.distance,
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
    pdf.save("shifts_report.pdf");
  };

  const delelePermanently = async (e) => {
    e.preventDefault();
    if (shiftID) {
      try {
        await publicRequest.delete(`/shifts/${shiftID}`);
        window.location.reload();
      } catch (error) {
        console.error("Error deleting shift:", error);
      }
    }
  };

  const handleDelete = async(id) => {
    setOpen(!open);
    setShiftID(id);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 150 },
    { field: "date", headerName: "Date", width: 120 },
    { field: "time", headerName: "Time", width: 100 },
    { field: "location", headerName: "Location", width: 140 },
    { field: "client", headerName: "Client", width: 140 },
    { field: "duration", headerName: "Duration", width: 120 },
    { field: "staffEmail", headerName: "Staff Email", width: 120 },
    { field: "distance", headerName: "Distance(km)", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/shift/" + params.row._id}>
              <button className="productListEdit">View</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <h3 className="incidences-header">All Shifts</h3>
      <Link to="/newshift">
      <button className="new-shift">New Shift</button>
      </Link>
      
      <h4 className="filter-header">Filters</h4>
      <div className="filters">
        <div>
          <label htmlFor="">Staff Email:</label>
          <input
          type="text"
          placeholder="joedoe@gmail.com"
          value={filterStaffEmail}
          onChange={(e) => setFilterStaffEmail(e.target.value)}
        />
        </div>
        <div>
        <label>Client:</label>
        <input
          type="text"
          placeholder="Joe"
          value={filterClient}
          onChange={(e) => setFilterClient(e.target.value)}
        />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="text"
            value={filterStartDate}
            onChange={(e) => setFilterStartDate(e.target.value)}
            placeholder="25/01/2024"
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="text"
            value={filterEndDate}
            onChange={(e) => setFilterEndDate(e.target.value)}
            placeholder="25/02/2024"
          />
        </div>
        <div>
          <label htmlFor="">Location:</label>
        <input
          type="text"
          placeholder="Sydney"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
        />
        </div>
        <button onClick={generatePDF}>Generate Pdf</button>
      </div>

      {loading ? (
        <span>Loading ...</span>
      ) : (
        <DataGrid
          rows={filteredData}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={8}
          checkboxSelection
        />
      )}

      {open && (
        <div className="modal">
          <span className="modal-header">Are you sure you want to delete?</span>
          <div className="cancel-delete">
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={delelePermanently}>Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
}