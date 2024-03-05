import React from "react";
import "./announcement.css";
import { useState } from "react";
import { publicRequest } from "../../requestMethods";
import { useEffect } from "react";
import { DeleteOutline } from "@material-ui/icons";

const Announcement = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [description, setDescription] = useState("");

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  useEffect(() => {
    const getItems = async () => {
      try {
        setLoading(true)
        const res = await publicRequest.get("/announcements");
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    
    getItems();
  }, []);
  const handleAnnouncement = async (e) => {
    e.preventDefault();
    if (title && description) {
      const announcement = {
        title,
        description,
        time: new Date().toLocaleTimeString(),
      };
      try {
        await publicRequest.post("/announcements", announcement);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = async(e,id) =>{
    e.preventDefault();
    try {
        await publicRequest.delete(`/announcements/${id}`);
        window.location.reload();
    } catch (error) {
        console.log(error)
    }

  }

  return (
    <div className="announcement">
      <span className="announcement-header">Announcements</span>
     { data.map((announcement, index) =>
     
     <div className="annoucement-card" key={index}>
        <span className="announcement-text">
          {announcement.title}
        </span>
        <span className="announcement-time">{announcement.time}</span>
        <DeleteOutline onClick={(e) => handleDelete(e,announcement._id)} className="delete"/>
      </div>
     
     ) }
      

      <button onClick={handleOpen} className="announcement-add">
        Add Announcement
      </button>

      {open && (
        <div className="announcement-input">
          <input
            type="text"
            placeholder="Enter title"
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Enter description"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button onClick={handleAnnouncement}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default Announcement;
