import React from "react";
import "./login.css";
import { Redirect, Link, useHistory } from "react-router-dom";
import { publicRequest } from "../../requestMethods";

const Login = () => {
  const [staffID, setStaffID] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const history = useHistory();
  const staff = JSON.parse(localStorage.getItem("user"));

  const handleLogin = async (e) => {
    e.preventDefault();
    if (staffID && password) {
      try {
        setLoading(true);
        const res = await publicRequest.post("/auth/login", {
          staffID,
          password,
        });
        localStorage.setItem("staff", JSON.stringify(res.data));
        
        if(res.data){
          history.push("/home");
        }   
        setLoading(false);
      } catch (error) {
        setFailed(true);
        setLoading(false);
      }
    } else {
      setFailed(true);
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login-form">
        <h2>Admin</h2>
        <input
          type="text"
          placeholder="Enter the Staff ID"
          onChange={(e) => setStaffID(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>{loading ? "loading" : "Login"}</button>
        {staff ? <Redirect to="/home" /> : ""}
        {failed && (
          <span className="error">
            Please make sure you are admin and credentials are correct.
          </span>
        )}
      </div>
    </div>
  );
};

export default Login;
