import React, { useState, useEffect } from "react";
import Select from 'react-select';
import "./newProduct.css";
import { publicRequest } from "../../requestMethods";
import moment from 'moment';

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [success, setSuccess] = useState(false);
  const [date, setDate] = useState("");
  const [staffs, setStaffs] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleStaffChange = (selectedOption) => {
    setSelectedStaff(selectedOption);
    setInputs((prev) => {
      return { ...prev, staffEmail: selectedOption.value };
    });
  };

  useEffect(() => {
    const getStaffs = async () => {
      try {
        const res = await publicRequest.get("/users");
        setStaffs(res.data);
      } catch (error) {}
    };
    getStaffs();
  }, []);

  useEffect(() => {
    const getClients = async () => {
      try {
        const res = await publicRequest.get("/clients");
        setClients(res.data);
      } catch (error) {}
    };
    getClients();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    const formattedDate = moment(date).format('DD/MM/YYYY');
    
    try {
      await publicRequest.post("/shifts", { ...inputs, date: formattedDate });
      setSuccess(true);
      window.location.reload();
    } catch (error) {
      setSuccess(false);
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Shift</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Location</label>
          <Select
            options={clients.map(client => ({ value: client.address, label: client.address }))}
            onChange={(selectedOption) => handleChange({ target: { name: "location", value: selectedOption.value } })}
            placeholder="Select Location"
          />
        </div>
        <div className="addProductItem">
          <label>Date And Time</label>
          <input
            type="date"
            placeholder="2023-12-15"
            name="date"
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="08:00AM - 05:00PM"
            name="time"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Type</label>
          <input
            type="text"
            placeholder="AM/PM"
            name="type"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Client</label>
          <Select
            options={clients.map(client => ({ value: client.fullname, label: client.fullname }))}
            onChange={(selectedOption) => handleChange({ target: { name: "client", value: selectedOption.value } })}
            placeholder="Select Location"
          />
        </div>

        <div className="addProductItem">
          <label>Duration</label>
          <input
            type="text"
            placeholder="8 hours"
            name="duration"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Notes</label>
          <textarea
            type="text"
            placeholder="Lunch break at 5:00 PM"
            name="notes"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Assign Shift</label>
          <Select
            options={staffs.map(staff => ({ value: staff.email, label: staff.fullname }))}
            onChange={handleStaffChange}
            value={selectedStaff}
            placeholder="Select Staff"
          />
        </div>
        <div className="addProductItem">
          <label>Active</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="addProductButton" onClick={handleClick}>
          Create
        </button>
      </form>
    </div>
  );
}
