

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WelcomePage.css';
import { useNavigate } from 'react-router-dom';


const WelcomePage = ({ mobile }) => {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchMembers = async () => {
      try {
        // Use the backend GET endpoint for person entries by mobile
        const res = await axios.get(`http://localhost:8080/api/register/${mobile}/entries`);
        setMembers(res.data);
      } catch (err) {
        console.error('Error fetching members:', err);
      }
    };

    fetchMembers();
  }, [mobile]);

  const maskedMobile = mobile.replace(mobile.slice(3, 9), 'XXXXXX');

  return (
    <div className="welcome-container">
      <img src="/logo.png" alt="School Logo" className="school-logo" />
      <h2 className="school-name">Delhi Public School</h2>
      <p className="school-address">
        Nyati Estate Rd, Nyati County, Mohammed Wadi, Pune, Autadwadi Handewadi, Maharashtra 411060
      </p>

      <div className="welcome-box">
        <p><strong>Welcome</strong> Mr.{maskedMobile}</p>
      </div>

      <div className="members-section">
        <h3>Members</h3>
        <table className="members-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>DOB</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={member.id}>
                <td>{String(index + 1).padStart(2, '0')}</td>
                <td>{member.firstName}</td>
                <td>{member.dob}</td>
                <td>{member.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="actions">
       <button className="fill-btn" onClick={() => navigate('/fill-details')}>
  FILL DETAILS
</button>
 <button className="pay-btn">PAYMENTS</button>
        <button className="complete-btn">COMPLETE</button>
      </div>
    </div>
  );
};

export default WelcomePage;
