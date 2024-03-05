import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./resetpassword.css";
import { useState } from "react";
import { publicRequest } from "../../requestMethods";
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        setLoading(true);
        await publicRequest.post("/users/reset", {email });
        setSuccess(true);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <form>
          <h2>Forgot Password</h2>
          <label htmlFor="username">Email:</label>
          <div className="password">
            <input
              type="text"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value.replace(/\s/g, ''))}
            />
          </div>
          <span className="login-btn" onClick={sendEmail}>
            {loading ? <span>Loading...</span> : <span>Submit</span>}
          </span>
          {error && (
            <span className="error">
              You are not registered. Contact admin.
            </span>
          )}
          {success && (
            <span className="success">
              Check your email for instructions to reset password.
            </span>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
