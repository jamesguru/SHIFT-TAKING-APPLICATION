import { useEffect, useState } from "react";
import "./widgetLg.css";
import { publicRequest } from "../../requestMethods";
import moment from "moment";

export default function WidgetLg() {
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

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
    <div className="widgetLg">
      <h3 className="widgetLgTitle">New Clients</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Address</th>
          <th className="widgetLgTh">Status</th>
        </tr>

        {
          clients?.slice(0,5).map((client, index) => (
            <tr className="widgetLgTr" key={index}>
              <td className="widgetLgUser">
                <img
                  src="https://cdn.pixabay.com/photo/2014/04/03/11/56/avatar-312603_640.png"
                  alt=""
                  className="widgetLgImg"
                />
                <span className="widgetLgName">{client.fullname}</span>
              </td>
              <td className="widgetLgAmount">{moment(client.createdAt).format('MM/DD/YYYY')}</td>
              <td className="widgetLgDate">{client.address}</td>
              <td className="widgetLgStatus">
                <Button type="Approved" />
              </td>
            </tr>
          ))
        }
      </table>
    </div>
  );
}
