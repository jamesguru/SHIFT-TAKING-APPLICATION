import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useState } from "react";
import { publicRequest } from "../../requestMethods";
import { useNavigate } from "react-router-dom";
const UpdatePassword = () => {

  const [staffID, setStaffID] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [info, setInfo] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const sendStaffID = async (e) => {
    e.preventDefault();
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength || !hasUppercase || !hasSpecialCharacter) {
      setInfo(
        "Password must be at least 8 characters long, contain an uppercase letter, and have a special character."
      );
    }

    if (staffID && password && password2) {
      try {
        setLoading(true);
        await publicRequest.post("/users/update-password", {staffID,password});
        setSuccess(true);
        setLoading(false);
        navigate('/login')
        
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    
    if(password !== password2){

      setInfo('Passwords that you provided are not matching');
    }
    
  };

  return (
    
    <div>   
        <Navbar />
      <div className="login-container">
        <form>
          <h2>Reset Password</h2>
          <label htmlFor="username">Enter your staff ID:</label>
          <div className="password">
            <input
              type="text"
              id="staffID"
              name="staffID"
              onChange={(e) => setStaffID(e.target.value.replace(/\s/g, ''))}
             />
          </div>
          <label htmlFor="username">Enter your new password:</label>
          <div className="password">
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value.replace(/\s/g, ''))}
             />
          </div>
          <label htmlFor="username">Confirm your new password:</label>
          <div className="password">
            <input
               type="password"
               id="password2"
               name="password2"
              onChange={(e) => setPassword2(e.target.value.replace(/\s/g, ''))}
             />
          </div>
          {info && <span style={{color:'red'}}>{info}</span>}
          {error && (
            <span className="error">
              You are not registered. Contact admin.
            </span>
          )}
          <span className="login-btn" onClick={sendStaffID}>
            {loading ? <span>Loading...</span> : <span>Submit</span>}
          </span>
         
          {success && (
            <span className="success">
              Check your email for a new password.
            </span>
          )}
        </form>
        
      </div>
      <Footer />
    </div>
  )
}

export default UpdatePassword;