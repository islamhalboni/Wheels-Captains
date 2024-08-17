import React, { useState } from 'react';

const Step4BankDetails = ({ prevStep, nextStep, handleChange, values }) => {
  const [bankingMethod, setBankingMethod] = useState(values.bankingMethod);

  const handleBankingMethodChange = (e) => {
    const { value } = e.target;
    setBankingMethod(value);
    handleChange(e);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (bankingMethod === "none") {
      // Allow progression even if "none" is selected
      nextStep();
    } else {
      nextStep();
    }
  };

  return (
    <div className="form-container">
      <img src="wheels-logo.png" alt="Wheels Logo" className="form-logo" />

      <form>
        <h2>تفاصيل مالية</h2>

        <div>
          <label>ما هي الوسيلة المالية الالكترونية التي تمتلكها؟</label>
          <select name="bankingMethod" value={values.bankingMethod} onChange={handleBankingMethodChange}>
            <option value="">اختر</option>
            <option value="bankAccount">حساب بنكي</option>
            <option value="reflect">Reflect</option>
            <option value="none">لا املك</option>
          </select>
        </div>

        {bankingMethod === "bankAccount" && (
          <div>
            <label>مع أي بنك لديك حساب؟</label>
            <input
              type="text"
              name="bankName"
              value={values.bankName || ''}
              onChange={handleChange}
              placeholder="اسم البنك"
              required
            />
            <label>IBAN</label>
            <input
              type="text"
              name="iban"
              value={values.iban || ''}
              onChange={handleChange}
              placeholder="رقم IBAN"
              required
            />
          </div>
        )}

        {bankingMethod === "reflect" && (
          <div>
            <label>رقم الهاتف المرتبط بـ Reflect</label>
            <input
              type="text"
              name="reflectPhoneNumber"
              value={values.reflectPhoneNumber || ''}
              onChange={handleChange}
              placeholder="رقم الهاتف"
              required
            />
            <label>IBAN</label>
            <input
              type="text"
              name="iban"
              value={values.iban || ''}
              onChange={handleChange}
              placeholder="رقم IBAN"
              required
            />
          </div>
        )}

        {bankingMethod === "none" && (
          <div className="warning-message">
            <p>أنت بحاجة للحصول على حساب مالي لبدء العمل. يرجى التأكد من ترتيب ذلك قريبًا.</p>
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

export default Step4BankDetails;
