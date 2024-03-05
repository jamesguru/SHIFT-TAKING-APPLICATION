import './statement.css';
import { PieChart } from 'react-minimal-pie-chart';
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
const Statement = () => {
  const shifts = [
    { id: 1, date: '2023-01-15', hours: 8, rate: 15.5, location: 'Main Office' },
    // Add more shift data as needed
  ];

  // Calculate total earnings
  const totalEarnings = shifts.reduce((total, shift) => total + shift.hours * shift.rate, 0);
  // Mock data for additional details
  const additionalDetails = {
    deductions: 50,
    bonuses: 100,
    taxes: 20,
    netEarnings: totalEarnings - 50 + 100 - 20,
  };
return (
  <div className='statements'>
    <Link to="/staff">
        <span className="myshifts_back">
          <FaArrowLeft /> Back
        </span>
      </Link>
      <h1 className='statement-header-head'>Statements</h1>
      <div className="statement-wrapper">
        <div className="statement-card">

          <div className="statement-donut-all">
              <span className="statement-header">500</span>
          </div>
              <span className="statement-info">All Shifts</span>
        </div>
        <div className="statement-card">

          <div className="statement-donut-completed">
              <span className="statement-header">20</span>
          </div>
              <span className="statement-info">Completed Shifts</span>
        </div>
        <div className="statement-card">

          <div className="statement-donut-pending">
              <span className="statement-header">25</span>
          </div>
              <span className="statement-info">Pending Shifts</span>
        </div>
      </div>

      <div className="statement-report">

        <button className="statement-report-btn">Send Time Sheet</button>
        <div className='piechart-card'>
          <PieChart
            data={[
              { title: 'Net Earnings', value: additionalDetails.netEarnings, color: '#4CAF50' },
              { title: 'Deductions', value: additionalDetails.deductions, color: '#FFC107' },
              { title: 'Bonuses', value: additionalDetails.bonuses, color: '#2196F3' },
              { title: 'Taxes', value: additionalDetails.taxes, color: '#F44336' },
            ]}
            animate
          />
        </div>
      </div>  
  </div>
);
};

export default Statement;
