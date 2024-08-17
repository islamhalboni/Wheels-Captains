import React from 'react';

const Step5TermsConditions = ({ prevStep, handleSubmit }) => {
  return (
    <div className="form-container">
      <img src="wheels-logo.png" alt="Wheels Logo" className="form-logo" />

      <form onSubmit={handleSubmit}>
        <h2>الشروط والأحكام</h2>

        <div className="terms-content">
          <p>قبل بدء العمل ككابتن في Wheels، يرجى قراءة الشروط والأحكام التالية بعناية:</p>
          <p>
            1. يجب عليك الالتزام بجميع القوانين واللوائح المحلية المتعلقة بنقل الركاب والبضائع.
          </p>
          <p>
            2. يجب أن تكون جميع معلوماتك الشخصية والمالية دقيقة وصحيحة.
          </p>
          <p>
            3. يجب عليك الحفاظ على مستوى عالٍ من الخدمة والسلامة أثناء العمل.
          </p>
          <p>
            4. في حال حدوث أي تغيير في معلوماتك الشخصية أو المالية، يجب عليك تحديثها في أقرب وقت ممكن.
          </p>
          <p>
            5. قد يتم إنهاء عقد العمل إذا لم تلتزم بالشروط والأحكام المذكورة.
          </p>

          <label>
            <input
              type="checkbox"
              name="agreeTerms"
              required
            />
            أوافق على الشروط والأحكام المذكورة أعلاه
          </label>
        </div>

        <div className="button-group">
          <button type="button" onClick={prevStep}>رجوع</button>
          <button type="submit">إرسال</button>
        </div>
      </form>
    </div>
  );
};

export default Step5TermsConditions;
