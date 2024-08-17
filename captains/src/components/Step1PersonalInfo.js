// src/components/Step1PersonalInfo.js
import React, { useEffect, useState } from 'react';

const Step1PersonalInfo = ({ nextStep, handleChange, values }) => {
  const [days, setDays] = useState([]);

  const validatePhoneNumber = (number) => /^\d{10}$/.test(number);
  const validateID = (id) => /^\d{9}$/.test(id);

  const isValidDate = (day, month, year) => {
    const date = new Date(year, month - 1, day);
    return date.getDate() === parseInt(day) && date.getMonth() === month - 1 && date.getFullYear() === parseInt(year);
  };

  const handleNext = (e) => {
    e.preventDefault();
    
    const { birthdayDay, birthdayMonth, birthdayYear } = values;

    if (!validatePhoneNumber(values.contact)) {
      alert('يرجى إدخال رقم هاتف صحيح (10 أرقام).');
    } else if (!validateID(values.id)) {
      alert('يرجى إدخال رقم هوية صحيح (9 أرقام).');
    } else if (!isValidDate(birthdayDay, birthdayMonth, birthdayYear)) {
      alert('يرجى إدخال تاريخ صحيح.');
    } else {
      nextStep();
    }
  };

  const updateDays = (month, year) => {
    let daysInMonth;
    if (month === 2) { // February
      daysInMonth = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28;
    } else {
      daysInMonth = [4, 6, 9, 11].includes(month) ? 30 : 31;
    }
    setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));
  };

  useEffect(() => {
    if (values.birthdayMonth && values.birthdayYear) {
      updateDays(parseInt(values.birthdayMonth, 10), parseInt(values.birthdayYear, 10));
    }
  }, [values.birthdayMonth, values.birthdayYear]);

  const months = [
    { value: 1, label: "يناير" },
    { value: 2, label: "فبراير" },
    { value: 3, label: "مارس" },
    { value: 4, label: "أبريل" },
    { value: 5, label: "مايو" },
    { value: 6, label: "يونيو" },
    { value: 7, label: "يوليو" },
    { value: 8, label: "أغسطس" },
    { value: 9, label: "سبتمبر" },
    { value: 10, label: "أكتوبر" },
    { value: 11, label: "نوفمبر" },
    { value: 12, label: "ديسمبر" }
  ];

  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div>
      <div className="header">
        <img src="wheels-logo.png" alt="Wheels Logo" className="logo" />
      </div>
      <form>
        <h2>المعلومات الشخصية</h2>

        <div>
          <label>الاسم الكامل</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="الاسم الرباعي الكامل"
            required
          />
        </div>

        <div>
          <label>تاريخ الميلاد:</label>

          <select name="birthdayMonth" value={values.birthdayMonth} onChange={handleChange}>
            <option value="">الشهر</option>
            {months.map((month) => (
              <option key={month.value} value={month.value}>{month.label}</option>
            ))}
          </select>

          <select name="birthdayYear" value={values.birthdayYear} onChange={handleChange}>
            <option value="">العام</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select name="birthdayDay" value={values.birthdayDay} onChange={handleChange}>
            <option value="">اليوم</option>
            {days.map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>

        <div>
          <label>رقم الهاتف</label>
          <input
            type="tel"
            name="contact"
            value={values.contact}
            onChange={handleChange}
            placeholder="رقم الهاتف"
            required
          />
        </div>

        <div>
          <label>رقم الهوية</label>
          <input
            type="text"
            name="id"
            value={values.id}
            onChange={handleChange}
            placeholder="رقم الهوية"
            required
          />
        </div>

        <div>
          <label>الجنس</label>
          <select name="gender" value={values.gender} onChange={handleChange}>
            <option value="">اختر</option>
            <option value="male">ذكر</option>
            <option value="female">أنثى</option>
          </select>
        </div>

        <div>
          <label>اختر المحافظة</label>
          <select name="location" value={values.location} onChange={handleChange}>
            <option value="">اختر</option>
            <option value="Nablus">نابلس</option>
            <option value="Ramallah">رام الله</option>
            <option value="Jericho">أريحا</option>
            <option value="Tulkarem">طولكرم</option>
          </select>
        </div>

        <button type="submit" onClick={handleNext}>التالي</button>
      </form>
    </div>
  );
};

export default Step1PersonalInfo;
