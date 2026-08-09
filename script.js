const registrationForm = document.getElementById('registrationForm');
const formMessage = document.getElementById('formMessage');

registrationForm.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(registrationForm);
  const values = Object.fromEntries(formData.entries());
  if (!values.fullName || !values.fatherName || !values.dob || !values.gender || !values.qualification || !values.address || !values.taluka || !values.district || !values.pincode || !values.state || !values.mobile || !values.email || !values.aadhaar || !values.status) {
    formMessage.textContent = 'Please complete all required fields before submitting.';
    formMessage.style.color = '#b72136';
    return;
  }

  formMessage.textContent = 'Your registration form has been submitted successfully. We will contact you soon.';
  formMessage.style.color = '#0f5132';
  registrationForm.reset();
});