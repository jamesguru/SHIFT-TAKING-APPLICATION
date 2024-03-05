import { useState, useEffect } from "react";
import "./shift.css";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "rgb(24 92 175)",
};
const Shift = () => {
  const [open, setOpen] = useState(true);
  const [shift, setShift] = useState({});
  let [loading, setLoading] = useState(false);
  const [time, setTime] = useState(null);
  const user = useSelector((state) => state.user);
  const [userLocation, setUserLocation] = useState({});
  const [accuracy, setAccuracy] = useState(0);
  const [event, setEvent] = useState("");
  const [notes, setNotes] = useState("");
  const [distance, setDistance] = useState(0);
  const [error, setError] = useState(false);

  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const location = useLocation();
  const shiftId = location.pathname.split("/")[2];

  const handleCaseNotes = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const getActivity = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.get("/shifts/find/" + shiftId);

        setShift(res.data);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getActivity();
  }, [shiftId]);

  const handleClockIn = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          const coords = { lat: latitude, lng: longitude };
          setUserLocation(coords);
          setAccuracy(accuracy);
          setCurrentTime(new Date().toLocaleTimeString());
          if (accuracy > 50) {
            console.log("location is likely incorrect");
          } else {
            console.log("location is correct");
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );

      try {
        if (accuracy && userLocation && currentTime) {
          await publicRequest.put(`/shifts/clockin/${shiftId}`, {
            time: currentTime,
            coords: userLocation,
            accuracy,
          });

          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleClockOut = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          const coords = { lat: latitude, lng: longitude };
          setUserLocation(coords);
          setAccuracy(accuracy);
          setCurrentTime(new Date().toLocaleTimeString());
          if (accuracy > 50) {
            console.log("location is likely incorrect");
          } else {
            console.log("location is correct");
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );

      try {
        if (accuracy && userLocation && currentTime) {
          await publicRequest.put(`/shifts/clockout/${shiftId}`, {
            time: currentTime,
            coords: userLocation,
            accuracy,
          });

          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleBid = async () => {
    try {
      await publicRequest.put(`/shifts/assign/${shiftId}`, {
        location: shift.location,
        date: shift.date,
        time: shift.time,
        type: shift.type,
        duration: shift.type,
        staffEmail: user.currentUser.email,
        client: shift.client,
        notes: shift.notes,
      });

      window.location.reload();
    } catch (error) {
      console.log();
    }
  };

  const handleAddNotes = async () => {
    const now = new Date();
    setTime(now.toLocaleString());

    if (time && event && notes) {
      try {
        await publicRequest.put(`/shifts/casenote/${shiftId}`, {
          event,
          notes,
          time,
        });

        setEvent("");
        setNotes("");

        window.location.reload();
      } catch (error) {
        console.log("helooo");
      }
    } else {
      setError(true);
    }
  };
  const showStatus = (clockIn, clockout) => {
    if (clockIn?.length === 0 && clockout?.length === 0) {
      return "Pending";
    } else if (clockIn?.length > 0 && clockout?.length === 0) {
      return "Ongoing";
    } else {
      return "Completed";
    }
  };

  const handleUpdateDistance = async(e) => {
    e.preventDefault()

    try {
      await publicRequest.put(`/shifts/${shiftId}`, {
        distance,
      });
      window.location.reload();
    } catch (error) {
      console.log('error occurred')
    }

  }
  return (
    <div className="shift-container">
      <ClipLoader
        color={"rgb(24 92 175)"}
        loading={loading}
        cssOverride={override}
        size={70}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <div className="shift">
        <Link to="/staff">
          <span className="myshifts_back">
            <FaArrowLeft /> Back
          </span>
        </Link>
        <div className="shift_details">
          <ul>
            <li>
              <strong>ID:</strong>
              {shift._id}
            </li>
            <li>
              <strong>Location: </strong>
              {shift.location}
            </li>
            <li>
              <strong>Date and Time: </strong>
              {shift.date} {shift.time}
            </li>
            <li>
              <strong>Type:</strong> {shift.type}
            </li>
            <li>
              <strong>Duration:</strong> {shift.duration}
            </li>
            <li>
              <strong>Client:</strong> {shift?.client}
            </li>
            <li>
              <strong>Status:</strong>{" "}
              {showStatus(shift.clockin, shift.clockout)}
            </li>
            <li>
              <strong>Notes:</strong> {shift.notes}
            </li>
          </ul>

          {shift.staffEmail ? (
            ""
          ) : (
            <button className="shift_bid_btn" onClick={handleBid}>
              Bid
            </button>
          )}
          {shift.staffEmail && 
          <div className="distance">
          <strong><span>Distance covered: </span></strong>
            <input type="number" placeholder={shift?.distance} onChange={(e) => setDistance(e.target.value)}/>
            <div className="distance-update">   
              <span>km</span>
              <button className="update-distance" onClick={handleUpdateDistance}>update</button>
            </div>
          </div>
          
          }
          
        </div>

        {shift.staffEmail && (
          <div className="shift_casenotes">
            <table>
              <tr>
                <th>Date/Time</th>
                <th>Case</th>
                <th>Notes</th>
              </tr>

              {shift?.casenotes?.length ? (
                shift?.casenotes?.map((casenote, index) => (
                  <tr key={index}>
                    <td>{casenote.time}</td>
                    <td>{casenote.event}</td>
                    <td>{casenote.notes}</td>
                  </tr>
                ))
              ) : (
                <h3>No case notes Added</h3>
              )}
            </table>

            <div className="add_casenotes">
              <span>Add CaseNotes</span>
              <FaPlus
                className="add_casenotes_icon"
                onClick={handleCaseNotes}
              />
            </div>

            {open && (
              <div className="casenotes_inputs">
                <label htmlFor="">Case</label>
                <input type="text" onChange={(e) => setEvent(e.target.value)} />
                <label htmlFor="">Notes</label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
                {error && (
                  <span style={{ color: "red" }}>
                    Make sure you have filled all fields
                  </span>
                )}
                {error && (
                  <span style={{ color: "red" }}>You should double click.</span>
                )}
                <button onClick={handleAddNotes}>Submit</button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="button-container">
        <Link to="/report">
          <button className="shift_report_btn">Report</button>
        </Link>
        <div className="clockin_out">
          {shift?.clockin?.length > 0 && shift?.clockout?.length > 0 && (
            <p className="completed-shift-text">
              Thank you for completing this shift.
            </p>
          )}
          {shift?.clockin?.length === 0 && shift.staffEmail && (
            <button className="shift_clockin_btn" onClick={handleClockIn}>
              Clock In
            </button>
          )}
          {shift?.clockout?.length === 0 && shift.staffEmail && (
            <button className="shift_clockout_btn" onClick={handleClockOut}>
              Clock Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shift;
