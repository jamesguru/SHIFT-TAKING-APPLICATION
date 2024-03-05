import React from "react";
import "./topbar.css";
import { Redirect, Link, useHistory } from "react-router-dom";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";

export default function Topbar() {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.clear("staff");
    history.push("/");
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">AM SHIFTER Admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>

          <span className="logout" onClick={handleLogout}>
            Logout
          </span>
        </div>
      </div>
    </div>
  );
}
