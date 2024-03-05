import "./account.css";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/userRedux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { publicRequest } from "../../requestMethods";
const Account = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value.replace(/\s/g, ''));
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = async () => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength || !hasUppercase || !hasSpecialCharacter) {
      setError(
        "Password must be at least 8 characters long, contain an uppercase letter, and have a special character."
      );
    } else {
      await publicRequest.put(`/users/${user.currentUser._id}`,{
        email:user.currentUser.email,
        password
      });
      setError("");
      setSuccess("Password has been updated successfully. Check your email for the new password.");
      setPassword("")
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validatePassword();

    // You can add additional logic here, such as submitting the form if the password is valid.
  };
  return (
    <div className="myaccount">
      <Link to="/staff">
        <span className="myshifts_back">
          <FaArrowLeft /> Back
        </span>
      </Link>

      <h2>My account</h2>
      <hr />

      <div className="myaccount-container">
        <div className="myaccount-left">
          <label htmlFor="">Username</label>
          <input type="text" placeholder={user.currentUser.username} />
          <label htmlFor="">Full Name</label>
          <input type="text" placeholder={user.currentUser.fullname} />
          <label htmlFor="">Email</label>
          <input type="text" placeholder={user.currentUser.email} />
          <label htmlFor="">Phone</label>
          <input type="text" placeholder={user.currentUser.phone} />
          <label htmlFor="">Address</label>
          <input type="text" placeholder={user.currentUser.address} />
          <label htmlFor="">Gender</label>
          <input type="text" placeholder={user.currentUser.gender} />
          <label htmlFor="">Staff ID</label>
          <input type="text" placeholder={user.currentUser.staffID} />

          <button className="logout-myAccount" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="myaccount-right">
          <label htmlFor="">Change Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            placeholder="**************"
          />

          <span
            style={{
              display: "inline",
              cursor: "pointer",
              fontSize: "20px",
            }}
            onClick={handleTogglePassword}
          >
            {showPassword ? "🔒" : "👁️"}
          </span>
          <button className="update-myaccount" onClick={handleSubmit}>
            Submit
          </button>
          {error && <p style={{ color: "red", width: "200px" }}>{error}</p>}
          {success && (
            <p style={{ color: "green", width: "200px" }}>{success}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
