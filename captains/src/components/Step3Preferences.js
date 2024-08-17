import React, { useState } from 'react';

const Step3Preferences = ({ prevStep, nextStep, handleChange, values }) => {
  const [showSecondJobField, setShowSecondJobField] = useState(values.hasOtherJob);
  const [showMorningHours, setShowMorningHours] = useState(values.preferredHours === 'morning');
  const [showEveningHours, setShowEveningHours] = useState(values.preferredHours === 'evening');

  const handleJobChange = (e) => {
    handleChange(e);
    setShowSecondJobField(e.target.checked);
  };

  const handlePreferenceChange = (e) => {
    handleChange(e);
    const { value } = e.target;
    setShowMorningHours(value === 'morning');
    setShowEveningHours(value === 'evening');
  };

  const handleNext = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="form-container">
      <div className="logo-container">
        <img src="/wheels-logo.png" alt="Wheels Logo" className="logo" />
      </div>

      <form>
        <h2>تفضيلات العمل</h2>

        <div>
          <label>
            <input
              type="checkbox"
              name="hasOtherJob"
              checked={values.hasOtherJob}
              onChange={handleJobChange}
            />
            هل لديك وظيفة أخرى؟
          </label>
        </div>

        {showSecondJobField && (
          <div>
            <label>ما هي وظيفتك الثانية؟</label>
            <input
              type="text"
              name="secondJob"
              value={values.secondJob || ''}
              onChange={handleChange}
            />
          </div>
        )}

        <div>
          <label>ساعات العمل المفضلة:</label>
          <select name="preferredHours" value={values.preferredHours} onChange={handlePreferenceChange}>
            <option value="">اختر</option>
            <option value="morning">الصباح</option>
            <option value="evening">المساء</option>
            <option value="allday">طوال اليوم</option>
          </select>
        </div>

        {showMorningHours && (
          <div>
            <label>ساعات الصباح:</label>
            <select name="morningFrom" value={values.morningFrom} onChange={handleChange} disabled={values.preferredHours === 'allday'}>
              <option value="">من</option>
              {Array.from({ length: 9 }, (_, i) => i + 9).map(hour => (
                <option key={hour} value={hour}>{hour}:00</option>
              ))}
            </select>
            <select name="morningTo" value={values.morningTo} onChange={handleChange} disabled={values.preferredHours === 'allday'}>
              <option value="">إلى</option>
              {Array.from({ length: 9 }, (_, i) => i + 9).map(hour => (
                <option key={hour} value={hour}>{hour}:00</option>
              ))}
            </select>
          </div>
        )}

        {showEveningHours && (
          <div>
            <label>ساعات المساء:</label>
            <select name="eveningFrom" value={values.eveningFrom} onChange={handleChange} disabled={values.preferredHours === 'allday'}>
              <option value="">من</option>
              {Array.from({ length: 10 }, (_, i) => i + 15).map(hour => (
                <option key={hour} value={hour}>{hour % 24}:00</option>
              ))}
            </select>
            <select name="eveningTo" value={values.eveningTo} onChange={handleChange} disabled={values.preferredHours === 'allday'}>
              <option value="">إلى</option>
              {Array.from({ length: 10 }, (_, i) => (i + 16) % 24).map(hour => (
                <option key={hour} value={hour}>{hour % 24}:00</option>
              ))}
            </select>
          </div>
        )}

        <div className="button-group">
          <button type="button" onClick={prevStep}>رجوع</button>
          <button type="submit" onClick={handleNext}>التالي</button>
        </div>
      </form>
    </div>
  );
};

export default Step3Preferences;
