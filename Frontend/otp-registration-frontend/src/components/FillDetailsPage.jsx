import React, { useState } from 'react';
import './FillDetailsPage.css';
import { useNavigate } from 'react-router-dom';

const FillDetailsPage = () => {
  const [activeTab, setActiveTab] = useState('firstParent');
  const [students, setStudents] = useState([{ firstName: '', dob: '' }]);
  const [firstParent, setFirstParent] = useState({ name: '', phone: '' });
  const [secondParent, setSecondParent] = useState({ name: '', phone: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (index, field, value) => {
    const updatedStudents = [...students];
    updatedStudents[index][field] = value;
    setStudents(updatedStudents);
  };

  const handleParentChange = (type, field, value) => {
    if (type === 'first') {
      setFirstParent({ ...firstParent, [field]: value });
    } else {
      setSecondParent({ ...secondParent, [field]: value });
    }
  };

  const validateFields = () => {
    const newErrors = {};

    if (activeTab === 'firstParent') {
      if (!firstParent.name.trim()) newErrors.firstParentName = 'Name is required';
      if (!/^\d{10}$/.test(firstParent.phone)) newErrors.firstParentPhone = 'Phone must be 10 digits';
    }

    if (activeTab === 'secondParent') {
      if (!secondParent.name.trim()) newErrors.secondParentName = 'Name is required';
      if (!/^\d{10}$/.test(secondParent.phone)) newErrors.secondParentPhone = 'Phone must be 10 digits';
    }

    if (activeTab === 'student') {
      students.forEach((s, i) => {
        if (!s.firstName.trim()) newErrors[`studentName${i}`] = 'Name is required';
        if (!s.dob) newErrors[`studentDob${i}`] = 'DOB is required';
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addStudent = () => {
    if (students.length < 6) {
      setStudents([...students, { firstName: '', dob: '' }]);
    }
  };

  const handleSaveNext = () => {
    if (!validateFields()) return;

    if (activeTab === 'firstParent') setActiveTab('secondParent');
    else if (activeTab === 'secondParent') setActiveTab('student');
    else if (activeTab === 'student') {
      // Pass all data to payment page
      navigate('/payment', {
        state: {
          firstParent,
          secondParent,
          students,
        },
      });
    }
  };

  return (
    <div className="fill-details-container">
      <img src="/logo.png" alt="School Logo" className="school-logo" />
      <h2 className="school-name">Delhi Public School</h2>
      <p className="school-address">
        Nyati Estate Rd, Nyati County, Mohammed Wadi, Pune, Autadwadi Handewadi,
        <br />
        Maharashtra 411060
      </p>

      <button className="fill-details-btn">FILL DETAILS</button>

      <div className="tabs">
        <div
          className={`tab ${activeTab === 'firstParent' ? 'active' : ''}`}
          onClick={() => setActiveTab('firstParent')}
        >
          First Parent
        </div>
        <div
          className={`tab ${activeTab === 'secondParent' ? 'active' : ''}`}
          onClick={() => setActiveTab('secondParent')}
        >
          Second Parent
        </div>
        <div
          className={`tab ${activeTab === 'student' ? 'active' : ''}`}
          onClick={() => setActiveTab('student')}
        >
          Student
        </div>
      </div>

      <div className="form-section">
        {activeTab === 'firstParent' && (
          <>
            <h3 className="form-heading">First Parent Details</h3>
            <input
              type="text"
              placeholder="Enter First Parent Name *"
              value={firstParent.name}
              onChange={(e) => handleParentChange('first', 'name', e.target.value)}
              className="input-field"
            />
            {errors.firstParentName && <p className="error-msg">{errors.firstParentName}</p>}

            <input
              type="text"
              placeholder="Enter Contact Number *"
              value={firstParent.phone}
              onChange={(e) => handleParentChange('first', 'phone', e.target.value)}
              className="input-field"
            />
            {errors.firstParentPhone && <p className="error-msg">{errors.firstParentPhone}</p>}
          </>
        )}

        {activeTab === 'secondParent' && (
          <>
            <h3 className="form-heading">Second Parent Details</h3>
            <input
              type="text"
              placeholder="Enter Second Parent Name *"
              value={secondParent.name}
              onChange={(e) => handleParentChange('second', 'name', e.target.value)}
              className="input-field"
            />
            {errors.secondParentName && <p className="error-msg">{errors.secondParentName}</p>}

            <input
              type="text"
              placeholder="Enter Contact Number *"
              value={secondParent.phone}
              onChange={(e) => handleParentChange('second', 'phone', e.target.value)}
              className="input-field"
            />
            {errors.secondParentPhone && <p className="error-msg">{errors.secondParentPhone}</p>}
          </>
        )}

        {activeTab === 'student' && (
          <>
            <h3 className="form-heading">Student Details</h3>
            {students.map((student, index) => (
              <div className="student-entry" key={index}>
                <input
                  type="text"
                  placeholder="Enter First Name *"
                  value={student.firstName}
                  onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
                  className="input-field"
                />
                {errors[`studentName${index}`] && (
                  <p className="error-msg">{errors[`studentName${index}`]}</p>
                )}

                <input
                  type="date"
                  value={student.dob}
                  onChange={(e) => handleInputChange(index, 'dob', e.target.value)}
                  className="input-field"
                />
                {errors[`studentDob${index}`] && (
                  <p className="error-msg">{errors[`studentDob${index}`]}</p>
                )}
              </div>
            ))}
            {students.length < 6 && (
              <button className="add-btn" onClick={addStudent}>
                + Add Another
              </button>
            )}
          </>
        )}
      </div>

      <button className="save-btn" onClick={handleSaveNext}>
        Save & Next
      </button>
    </div>
  );
};

export default FillDetailsPage;
