import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Visibility,
    Description,
    FormatListNumberedRtl,
  } from "@material-ui/icons";
  import "./client.css";
  import { Link, useLocation} from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { publicRequest,url } from "../../requestMethods";
  
  export default function Client() {
    const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [client, setClient] = useState({});
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    const getClient = async () => {
      try {
        const res = await publicRequest.get("/clients/find/" + id);
        setClient(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getClient();
  }, [id]);

  const handleView = (doc) =>{
    window.open(`${url}/files/${doc}`,"_blank","noreferrer")

  }

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (inputs) {
      try {
        await publicRequest.put(`/clients/${client._id}`, inputs);
        window.location.reload();
      } catch (error) {}
    }
  };

    return (
      <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit Client</h1>
        <Link to="/newclient">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
           
            <div className="userShowTopTitle">
              <span className="userShowUsername">{client.fullname}</span>
             
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{client.fullname}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{client.DOB}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{client.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{client.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{client.address}</span>
            </div>
            <div className="userShowInfo">
              <span className="userShowInfoTitle"><strong>NDIS NO:</strong> {client.ndisNo}</span>
            </div>
            <div className="userShowInfo">
              <span className="userShowInfoTitle"><strong>Plan Start Date:</strong> {client.startdate}</span>
            </div>
            <div className="userShowInfo">
              <span className="userShowInfoTitle"><strong>Plan End Date:</strong> {client.enddate}</span>
            </div>
            <div className="userShowInfo">
              <span className="userShowInfoTitle"><strong>Note:</strong> {client.desc}</span>
            </div>
          </div>
          <div>
           <span className="documents">Documents</span>

              {client?.documents?.map((doc,index) => 
              
              <div className="doc" key={index}>
                <Description className="visibility_icon" onClick={() => handleView(doc)} />
                <span>{doc}</span>
              </div>
              )}
            </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
             
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder={client.fullname}
                  className="userUpdateInput"
                  name="fullname"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={client.email}
                  className="userUpdateInput"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder={client.phone}
                  className="userUpdateInput"
                  name="phone"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder={client.address}
                  className="userUpdateInput"
                  name="address"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>DOB</label>
                <input
                  type="text"
                  placeholder={client.DOB}
                  className="userUpdateInput"
                  name="DOB"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>NDIS NO</label>
                <input
                  type="text"
                  placeholder={client.ndisNo}
                  className="userUpdateInput"
                  name="ndisNo"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Plan Start Date</label>
                <input
                  type="text"
                  placeholder={client.startdate}
                  className="userUpdateInput"
                  name="startdate"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Plan End Date</label>
                <input
                  type="text"
                  placeholder={client.enddate}
                  className="userUpdateInput"
                  name="enddate"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Note</label>
                <input
                  type="text"
                  placeholder={client.desc}
                  className="userUpdateInput"
                  name="desc"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
              
                <label htmlFor="file">

                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton" onClick={handleUpdate}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    );
  }
  