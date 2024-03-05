import { useState, useEffect } from "react";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import "./staff.css";
import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AiOutlineEye } from "react-icons/ai";
import { logOut } from "../../redux/userRedux";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { publicRequest } from "../../requestMethods";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "rgb(24 92 175)",
};
const Staff = () => {
  const user = useSelector((state) => state.user);
  const [profile, setProfile] = useState(false);
  const [data, setData] = useState([]);
  const [unassignedShifts, setUnassignedShifts] = useState([]);
  const dispatch = useDispatch();
  let [loading, setLoading] = useState(false);
 

  const navigate = useNavigate();

  useEffect(() => {
    const getShifts = async () => {
      try {
        setLoading(true)
        const res = await publicRequest.post("/shifts/me", {
          email: user.currentUser.email,
        });
        setData(res.data);
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    };
    getShifts();
  }, []);

  useEffect(() => {
    const getShifts = async () => {     
      try {
        setLoading(true)
        const res = await publicRequest.get("/shifts/unassigned");
        setUnassignedShifts(res.data);
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    };
    getShifts();
  }, []);

  const handleProfile = () => {
    setProfile(!profile);
  };


  const showStatus =(clockIn, clockout)=>{

    if(clockIn?.length === 0 && clockout?.length === 0){
      return 'Pending'
    }else if(clockIn?.length > 0 && clockout?.length === 0){
      return 'Ongoing'
    }else{
      return 'Completed'
    }

  }

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <div className="staff">
      <div className="stafftop">
        <span className="staff_shifts">All Shifts</span>
        <div className="staff_profile">
          <div className="staff_icon">
            <FaUser size={18} color="#444" className="profile_icon" />
            <span className="staff_name" onClick={handleProfile}>
              {user.currentUser.fullname}
            </span>
          </div>

          {profile && (
            <div className="staff_account">
              <Link to="/myaccount">
                <span>My Account</span>
              </Link>
              <Link to="/statements">
              <span>My Statements</span>
              </Link>
              <Link to="/myshifts">
                <span>My Shifts</span>
              </Link>
              <Link to="/report">
                <span>Report incidence</span>
              </Link>

              <span onClick={handleLogout}>Logout</span>
            </div>
          )}
        </div>
      </div>

      <div className="staff_main">
        <h3 className="shift-header">My shifts</h3>
        <ClipLoader
        color={"rgb(24 92 175)"}
        loading={loading}
        cssOverride={override}
        size={70}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
        {data?.length === 0 && loading === false ? <h4 className="no-shifts"> No Shifts Assigned To You. Please wait.</h4> : data?.map((shift, index) => (
          <div className={shift?.clockin?.length === 0 && shift?.clockout?.length === 0 || shift?.clockin?.length > 0 && shift?.clockout?.length === 0 ? 'staff_main_card' : 'staff_main_card_none'} key={index}>
            <div className="staff_main_card_date">
              <span>{moment(shift.date,'DD/MM/YYYY').format("ddd DD")}</span>
            </div>

            <div className="staff_main_card_info">
              <span className="shift-location-time">
                {shift.location}, {shift.time}
              </span>
              <span className="shift-notes">Duration: {shift.duration}</span>
            </div>

            <div className="shift_status">
              <span className={shift?.clockin?.length > 0 && shift?.clockout?.length === 0 ? "shift_status_ongoing": "shift_status_completed"}>{showStatus(shift.clockin, shift.clockout)}</span>
            </div>

            <div className="staff_main_card_options">
              <Link to={`/shift/${shift._id}`}>
                <AiOutlineEye size={25} />
              </Link>
            </div>
           
          </div>
        )) }

        <h3 className="shift-header">Bid shifts</h3>
        <ClipLoader
         color={"rgb(24 92 175)"}
        loading={loading}
        cssOverride={override}
        size={70}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
        {unassignedShifts?.length === 0 && loading === false ? <h4 className="no-shifts"> No Shifts To Bid. Please wait.</h4> :unassignedShifts.slice(0,5).map((shift, index) => (
          <div className={shift.shiftEmail ? 'staff_main_card': 'staff_main_card_unassigned'} key={index}>
            <div className="staff_main_card_date">
            <span>{moment(shift.date,'DD/MM/YYYY').format("ddd DD")}</span>
            </div>

            <div className="staff_main_card_info">
              <span className="shift-location-time">
                {shift.location}, {shift.time}
              </span>
              <span className="shift-notes">Duration: {shift.duration}</span>
            </div>

            <div className="shift_status">
              <span className="shift_status_completed">{showStatus(shift.clockin, shift.clockout)}</span>
            </div>

            <div className="staff_main_card_options">
              <Link to={`/shift/${shift._id}`}>
                <AiOutlineEye size={25} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Staff;
