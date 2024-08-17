import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Step1PersonalInfo from './components/Step1PersonalInfo';
import Step2VehicleInfo from './components/Step2VehicleInfo';
import Step3Preferences from './components/Step3Preferences';
import Step4BankDetails from './components/Step4BankDetails';
import Step5TermsConditions from './components/Step5TermsConditions';
import Step6Confirmation from './components/Step6Confirmation';
import AdminDashboard from './admin/AdminDashboard'; // Import the Admin Dashboard

import './Step1PersonalInfo.css';
import './Step2VehicleInfo.css';
import './Step3Preferences.css';
import './Step4BankDetails.css';
import './Step5TermsConditions.css';
import './Step6Confirmation.css';

import './App.css';



const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />
        
        {/* Default Route for the Multi-step Form */}
        <Route path="*" element={<MultiStepForm />} />
      </Routes>
    </Router>
  );
};

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    contact: '',
    birthdayDay: '',
    birthdayMonth: '',
    birthdayYear: '',
    gender: '',
    id: '',
    vehicleName: '',
    vehicleModel: '',
    vehicleYear: '',
    vehicleColor: '',
    vehicleType: 'car',
    registration: null,
    insurance: null,
    license: null,
    hasOtherJob: false,
    secondJob: '',
    preferredHours: '',
    morningFrom: '',
    morningTo: '',
    eveningFrom: '',
    eveningTo: '',
    hasBankAccount: '',
    usesReflect: '',
    bankName: '',
    iban: '',
    reflectPhoneNumber: '',
    bankingMethod: '',
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();  // Go to the confirmation page
  };

  switch (step) {
    case 1:
      return (
        <Step1PersonalInfo
          nextStep={nextStep}
          handleChange={handleChange}
          values={formData}
        />
      );
    case 2:
      return (
        <Step2VehicleInfo
          prevStep={prevStep}
          nextStep={nextStep}
          handleChange={handleChange}
          values={formData}
        />
      );
    case 3:
      return (
        <Step3Preferences
          prevStep={prevStep}
          nextStep={nextStep}
          handleChange={handleChange}
          values={formData}
        />
      );
    case 4:
      return (
        <Step4BankDetails
          prevStep={prevStep}
          nextStep={nextStep}
          handleChange={handleChange}
          values={formData}
        />
      );
    case 5:
      return (
        <Step5TermsConditions
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      );
    case 6:
      return <Step6Confirmation />;
    default:
      return <div>Unknown step</div>;
  }
};

export default App;
