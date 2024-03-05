import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./incidence.css";
import { publicRequest } from "../../requestMethods";

const libraries = ["places"];

export default function Incident() {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({});
  const location = useLocation();
  const [incident, setIncident] = useState({});
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const getActivity = async () => {
      try {
        const res = await publicRequest.get("/incidences/find/" + id);
        setIncident(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getActivity();
  }, [id]);

  const handleCloseMap = (e, coords) => {
    e.preventDefault();
    setCoords(coords);
    setOpen(!open);
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h3 className="productTitle">Incidence: {id}</h3>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <ul>
            <li>
              <strong>ID:</strong>
              {incident._id}
            </li>
            <li>
              <strong>Location: </strong>
              {incident.location}
            </li>
            <li>
              <strong>Date and Time: </strong>
              {incident.date} {incident.time}
            </li>
            <li>
              <strong>Address Of Location: </strong>
              {incident.addressOfLocation}
            </li>
            <li>
              <strong>Date Of Report: </strong>
              {incident.dateOfReport}
            </li>
            <li>
              <strong>Person Affected: </strong>
              {incident.personAffected}
            </li>
            <li>
              <strong>Person Completing Form: </strong>
              {incident.personCompletingForm}
            </li>
            <li>
              <strong>Person Injured: </strong>
              {incident.personInjured}
            </li>
            <li>
              <strong>Report By: </strong>
              {incident.reportBy}
            </li>
            <li>
              <strong>Role Of person: </strong>
              {incident.roleOfPerson}
            </li>

            <li>
              <strong>Other People Affected: </strong>
             <span>{incident.person1}</span> 
             <span>{incident.phone1}</span> |
             <span>{incident.person2}</span>
             <span>{incident.phone2}</span> |
             <span>{incident.person3}</span>
             <span>{incident.phone3}</span>
            </li>
            <li>
              <strong>Type of Incidence</strong>
              {incident?.typeOfIncidence?.map((item, index) => (
                <>
                  <span key={index}>{item}</span>|
                </>
              ))}
            </li>
            <li>
              <strong>What Happened: </strong>
              {incident.whatHappened}
            </li>

            <li>
              <strong>Actual Incidence: </strong>
              {incident.actualIncident}
            </li>
            <li>
              <strong>After Incident: </strong>
              {incident.afterIncident}
            </li>
           
          </ul>
        </div>
      </div>
    </div>
  );
}
