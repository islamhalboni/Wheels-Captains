import React, { useState } from 'react';

const Step2VehicleInfo = ({ prevStep, nextStep, handleChange, values }) => {
  const [vehicleType, setVehicleType] = useState('car');
  const [registrationPreview, setRegistrationPreview] = useState(null);
  const [insurancePreview, setInsurancePreview] = useState(null);
  const [licensePreview, setLicensePreview] = useState(null);

  const handleVehicleTypeChange = (e) => {
    setVehicleType(e.target.value);
    handleChange(e);
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    handleChange({ target: { name, value: file } });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (name === 'registration') {
          setRegistrationPreview(reader.result);
        } else if (name === 'insurance') {
          setInsurancePreview(reader.result);
        } else if (name === 'license') {
          setLicensePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.license) {
      alert('Please upload the license.');
    } else {
      nextStep();
    }
  };

  return (
    <div className="vehicle-info-container">
      <div className="logo-container">
        <img src="/wheels-logo.png" alt="Wheels Logo" className="logo" />
      </div>
      <form onSubmit={handleSubmit}>
        <h2>معلومات المركبة</h2>

        <div>
          <label>نوع المركبة: </label>
          <select name="vehicleType" value={vehicleType} onChange={handleVehicleTypeChange}>
            <option value="car">سيارة</option>
            <option value="motorcycle">دراجة</option>
          </select>
        </div>

        <div>
          <label>اسم المركبة</label>
          <input
            type="text"
            name="vehicleName"
            value={values.vehicleName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>الموديل</label>
          <input
            type="text"
            name="vehicleModel"
            value={values.vehicleModel}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>تاريخ الانتاج</label>
          <input
            type="number"
            name="vehicleYear"
            value={values.vehicleYear}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>لون المركبة</label>
          <input
            type="text"
            name="vehicleColor"
            value={values.vehicleColor}
            onChange={handleChange}
            required
          />
        </div>

        {/* New Board Number Field */}
        <div>
          <label>رقم اللوحة</label>
          <input
            type="text"
            name="boardNumber"
            value={values.boardNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>الترخيص (اختياري):</label>
          <input
            type="file"
            name="registration"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
          />
          {registrationPreview && <img src={registrationPreview} alt="Registration Preview" className="image-preview" />}
        </div>

        <div>
          <label>التأمين (اختياري):</label>
          <input
            type="file"
            name="insurance"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
          />
          {insurancePreview && <img src={insurancePreview} alt="Insurance Preview" className="image-preview" />}
        </div>

        <div>
          <label>الرخصة (اجباري):</label>
          <input
            type="file"
            name="license"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            required
          />
          {licensePreview && <img src={licensePreview} alt="License Preview" className="image-preview" />}
        </div>

        <div>
          <button type="button" onClick={prevStep}>رجوع</button>
          <button type="submit">التالي</button>
        </div>
      </form>
    </div>
  );
};

export default Step2VehicleInfo;
