import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    // Fetch applications from the backend API
    fetch('/api/applications')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setApplications(data);
      })
      .catch(error => console.error('Error fetching applications:', error));
  }, []);

  const calculateCompletion = (application) => {
    let totalFields = 24;
    let filledFields = 0;

    for (const key in application) {
      if (application[key] && application[key] !== '') {
        filledFields++;
      }
    }

    return (filledFields / totalFields) * 100;
  };

  const viewDetails = (application) => {
    setSelectedApplication(application);
  };

  const closeDetails = () => {
    setSelectedApplication(null);
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('details-modal')) {
      closeDetails();
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Completion</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, index) => (
            <tr key={index}>
              <td>{app.name}</td>
              <td>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${calculateCompletion(app)}%` }}
                  ></div>
                </div>
                {Math.round(calculateCompletion(app))}%
              </td>
              <td>
                <button onClick={() => viewDetails(app)}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedApplication && (
        <div className="details-modal" onClick={handleOutsideClick}>
          <div className="details-content" onClick={(e) => e.stopPropagation()}>
            <h2>Application Details</h2>
            <p><strong>Name:</strong> {selectedApplication.name}</p>
            <p><strong>Location:</strong> {selectedApplication.location}</p>
            <p><strong>Contact:</strong> {selectedApplication.contact}</p>
            <p><strong>Birthday:</strong> {selectedApplication.birthdayDay}/{selectedApplication.birthdayMonth}/{selectedApplication.birthdayYear}</p>
            <p><strong>Gender:</strong> {selectedApplication.gender}</p>
            <p><strong>ID:</strong> {selectedApplication.id}</p>
            <p><strong>Vehicle Name:</strong> {selectedApplication.vehicleName}</p>
            <p><strong>Vehicle Model:</strong> {selectedApplication.vehicleModel}</p>
            <p><strong>Vehicle Year:</strong> {selectedApplication.vehicleYear}</p>
            <p><strong>Vehicle Color:</strong> {selectedApplication.vehicleColor}</p>
            <p><strong>Vehicle Type:</strong> {selectedApplication.vehicleType}</p>
            <p><strong>Registration:</strong> {selectedApplication.registration}</p>
            <p><strong>Insurance:</strong> {selectedApplication.insurance}</p>
            <p><strong>License:</strong> {selectedApplication.license}</p>
            <p><strong>Other Job:</strong> {selectedApplication.hasOtherJob ? 'Yes' : 'No'}</p>
            {selectedApplication.hasOtherJob && (
              <p><strong>Second Job:</strong> {selectedApplication.secondJob}</p>
            )}
            <p><strong>Preferred Hours:</strong> {selectedApplication.preferredHours}</p>
            <p><strong>Morning Hours:</strong> {selectedApplication.morningFrom} - {selectedApplication.morningTo}</p>
            <p><strong>Evening Hours:</strong> {selectedApplication.eveningFrom} - {selectedApplication.eveningTo}</p>
            <p><strong>Bank Account:</strong> {selectedApplication.hasBankAccount ? 'Yes' : 'No'}</p>
            {selectedApplication.hasBankAccount && (
              <>
                <p><strong>Bank Name:</strong> {selectedApplication.bankName}</p>
                <p><strong>IBAN:</strong> {selectedApplication.iban}</p>
              </>
            )}
            <p><strong>Uses Reflect:</strong> {selectedApplication.usesReflect ? 'Yes' : 'No'}</p>
            {selectedApplication.usesReflect && (
              <p><strong>Reflect Phone Number:</strong> {selectedApplication.reflectPhoneNumber}</p>
            )}
            <p><strong>Banking Method:</strong> {selectedApplication.bankingMethod}</p>

            <button onClick={closeDetails}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
