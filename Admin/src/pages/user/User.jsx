import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Description,
} from "@material-ui/icons";
import "./user.css";
import { publicRequest, url } from "../../requestMethods";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default function User() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [staff, setStaff] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [inputs, setInputs] = useState({});
  const history = useHistory();
  useEffect(() => {
    const getStaff = async () => {
      try {
        const res = await publicRequest.get("/users/find/" + id);
        setStaff(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getStaff();
  }, [id]);

  const handleView = (doc) => {
    window.open(`${url}/files/${doc}`, "_blank", "noreferrer");
  };

  const validatePassword = async () => {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
      const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const numericChars = '0123456789';
      const specialChars = '!@#$%^&*()-=_+[]{}|;:,.<>?';

      // Combine all character sets
      const allChars = lowercaseChars + uppercaseChars + numericChars + specialChars;

      // Set the desired password length
      const passwordLength = 12; // You can adjust the length as needed

      // Generate the password
      let password = '';
      for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars.charAt(randomIndex);
      }
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength || !hasUppercase || !hasSpecialCharacter) {
      setError(
        "Password must be at least 8 characters long, contain an uppercase letter, and have a special character."
      );
    } else {
      await publicRequest.put(`/users/${staff._id}`, {
        email: staff.email,
        password,
      });
      setError("");
      setSuccess(
        "Password has been updated successfully."
      );
      
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    validatePassword();
// You can add additional logic here, such as submitting the form if the password is valid.
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (inputs) {
      try {
        await publicRequest.put(`/users/${staff._id}`, inputs);
        window.location.reload();
      } catch (error) {}
    }
  };
  
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit Staff</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <div className="userShowTopTitle">
              <span className="userShowUsername">{staff.fullname}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{staff.username}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{staff.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{staff.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{staff.address}</span>
            </div>
            <div className="userShowInfo">
              <span className="userShowInfoTitle"><strong>Staff ID: </strong> {staff.staffID}</span>
            </div>
            <div>
              <span className="documents">Documents</span>

              {staff?.documents?.map((doc, index) => (
                <div className="doc" key={index}>
                  <Description
                    className="visibility_icon"
                    onClick={() => handleView(doc)}
                  />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={staff.username}
                  className="userUpdateInput"
                  name="username"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder={staff.fullname}
                  className="userUpdateInput"
                  name="fullname"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={staff.email}
                  className="userUpdateInput"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder={staff.phone}
                  className="userUpdateInput"
                  name="phone"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder={staff.address}
                  className="userUpdateInput"
                  name="address"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <label htmlFor="file"></label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
                
              <div className="reset">
                <button className="reset-button" onClick={handleSubmit}>
                  Reset Password
                </button>
                {error && (
                  <p style={{ color: "red", width: "200px" }}>{error}</p>
                )}
                {success && (
                  <p style={{ color: "green", width: "200px" }}>{success}</p>
                )}
              </div>
              <button className="userUpdateButton" onClick={handleUpdate}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
