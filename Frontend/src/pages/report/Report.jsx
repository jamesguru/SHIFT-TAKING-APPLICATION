import { useState } from "react";
import "./report.css";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
const typeOfIncidence = [];
const Report = () => {
  const [other, setOther] = useState(false);
  const [inputs, setInputs] = useState({});

  const handleOther = () => {
    setOther(!other);
  };
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });

    console.log(inputs);
  };

  const handleClick = async(e) => {
    e.preventDefault();
    const report = {typeOfIncidence, ...inputs};
    try {
      await publicRequest.post('/incidences',report);
     window.location.reload();
    } catch (error) {
      console.log(error)
    }
  };
  const handleType = (type) => {
    typeOfIncidence.push(type);
  };
  return (
    <div className="report">
      <Link to="/staff">
        <span className="myshifts_back">
          <FaArrowLeft /> Back
        </span>
      </Link>
      <h2 className="report-header">Report Incidence</h2>
      <label htmlFor="">Date of Incident</label>
      <input
        type="text"
        placeholder="01/01/2024"
        name="date"
        onChange={handleChange}
      />
      <label htmlFor="">Time of Incident</label>
      <input
        type="text"
        placeholder="08:00 AM"
        name="time"
        onChange={handleChange}
      />
      <label htmlFor="">Location(e.g., Kitchen, Lounge etc)</label>
      <input
        type="text"
        placeholder="Kitchen"
        name="location"
        onChange={handleChange}
      />
      <label htmlFor="">Person completing this form.</label>
      <input
        type="text"
        placeholder="John Doe"
        name="personCompletingForm"
        onChange={handleChange}
      />
      <label htmlFor="">Address of location</label>
      <input
        type="text"
        placeholder="Melbourne, Laura Avenue 234-500"
        name="addressOfLocation"
        onChange={handleChange}
      />
      <label htmlFor="">Person affected in this incidence</label>
      <input
        type="text"
        placeholder="Jane Doe"
        name="personAffected"
        onChange={handleChange}
      />
      <label htmlFor="">
        Were there other person(s) present(witness) at this time of incident?
        Yes, or No ?
      </label>
      <span>Yes</span>
      <input type="checkbox" onClick={handleOther} />
      <span>No</span>
      <input type="checkbox" />
      <span>If you ticked Yes for the above question,please provide</span>
      <span>Name(s) and contact number(s)</span>

      {other && (
        <div className="other-people">
          <label htmlFor="">Person 1</label>
          <input
            type="text"
            placeholder="John Doe"
            name="person1"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="2358282920"
            name="phone1"
            onChange={handleChange}
          />
          <label htmlFor="">Person 2</label>
          <input
            type="text"
            placeholder="Laura Doe"
            name="person2"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="9357286920"
            name="phone2"
            onChange={handleChange}
          />
          <label htmlFor="">Person 3</label>
          <input
            type="text"
            placeholder="Rita Doe"
            name="person3"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="9358282920"
            name="phone3"
            onChange={handleChange}
          />
        </div>
      )}
      <label htmlFor="">Who was injured(if anyone)</label>
      <input
        type="text"
        placeholder="James Rock"
        name="personInjured"
        onChange={handleChange}
      />
      <label htmlFor="">Type of incident:</label>
      <span>Act of violence</span>
      <input
        type="checkbox"
        onClick={() => handleType(" Act Of Violence")}
      />
      <span>Property Damage</span>
      <input
        type="checkbox"
        onClick={() => handleType("Property Damaged")}
      />
      <span>Accident</span>
      <input type="checkbox" onClick={() => handleType("Accident")} />
      <span>Behavioural</span>
      <input
        type="checkbox"
       
        onClick={() => handleType("Behavioral")}
      />
      <span>Other</span>
      <input type="checkbox"  onClick={() => handleType("Other")} />
      <label htmlFor="">Details of Incident</label>
      <textarea
        id=""
        cols="30"
        rows="10"
        placeholder="Describe what happened before the incident."
        name="whatHappened"
        onChange={handleChange}
      ></textarea>
      <textarea
        name="actualIncident"
        onChange={handleChange}
        id=""
        cols="30"
        rows="10"
        placeholder="Describe actual Incident/ Behaviour/ Event"
      ></textarea>
      <textarea
        name="afterIncident"
        onChange={handleChange}
        id=""
        cols="30"
        rows="10"
        placeholder="What happened after incident, detail your actions?"
      ></textarea>
      <label htmlFor="">Report by:</label>
      <input type="text" name="reportBy" onChange={handleChange} />
      <label htmlFor="">Date of report:</label>
      <input type="text" name="dateOfReport" onChange={handleChange} />
      <label htmlFor="">Title/ Role of person reporting:</label>
      <input type="text" name="roleOfPerson" onChange={handleChange} />
      <button className="report_btn" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
};

export default Report;
