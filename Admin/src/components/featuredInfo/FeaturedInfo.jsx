import { useEffect, useState } from "react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { publicRequest } from "../../requestMethods";

export default function FeaturedInfo() {

  const [shifts, setShifts] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [clients, setClients] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading]=useState(false);

  useEffect(() => {
    const getShifts = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.get("/shifts");
        setShifts(res.data);
        
      } catch (error) {
        console.error("Error fetching shifts:", error);
        setLoading(false);
      }
    };
    getShifts();
  }, []);

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

  useEffect(() => {
    const getClients = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.get("/clients");
        setClients(res.data);
        
      } catch (error) {
        console.error("Error fetching shifts:", error);
        setLoading(false);
      }
    };
    getClients();
  }, []);
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Shifts</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{shifts.length }</span>
          <span className="featuredMoneyRate">
            -11.4 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Clients</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{clients.length}</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Staffs</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{staffs.length}</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
