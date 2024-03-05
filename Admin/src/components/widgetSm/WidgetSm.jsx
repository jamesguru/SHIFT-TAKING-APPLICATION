import { useEffect, useState } from "react";
import "./widgetSm.css";
import { Visibility, Person } from "@material-ui/icons";
import { publicRequest } from "../../requestMethods";

export default function WidgetSm() {
  const [loading, setLoading] = useState(false);
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    const getStaffs = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.get("/users");
        setStaffs(res.data);
      } catch (error) {
        console.error("Error fetching shifts:", error);
        setLoading(false);
      }
    };
    getStaffs();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Staffs</span>
      <ul className="widgetSmList">   
       {staffs?.slice(0,5)?.map((staff, index) =>
       <li className="widgetSmListItem" key={index}>
       <img
         src="https://cdn.pixabay.com/photo/2014/04/03/11/47/avatar-312160_640.png"
         alt=""
         className="widgetSmImg"
       />
       <div className="widgetSmUser">
         <span className="widgetSmUsername">{staff.fullname}</span>
         <span className="widgetSmUserTitle">{staff.address}</span>
       </div>
       <button className="widgetSmButton">
         <Visibility className="widgetSmIcon" />
         Display
       </button>
     </li>
       
       )
        }
      </ul>
    </div>
  );
}
