document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const countryCode = document.getElementById('countryCode');
  
    let isValid = true;
    clearErrors();
  
    // Name validation
    if (name.value.trim().length < 3) {
      showError(name, "Name must be at least 3 characters.");
      isValid = false;
    }
  
    // Phone validation (digits only, 7-15 length)
    const phoneValue = phone.value.trim();
    if (!/^\d+$/.test(phoneValue)) {
      showError(phone, "Phone number must contain digits only.");
      isValid = false;
    } else if (phoneValue.length < 7 || phoneValue.length > 15) {
      showError(phone, "Phone number must be between 7 and 15 digits.");
      isValid = false;
    }
  
    // Email validation
    const emailValue = email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      showError(email, "Invalid email format.");
      isValid = false;
    }
  
    // Message validation
    if (message.value.trim().length < 10) {
      showError(message, "Message must be at least 10 characters.");
      isValid = false;
    }
  
    // Final form result
    if (isValid) {
      const data = {
        name: name.value.trim(),
        phone: countryCode.value + phone.value.trim(),
        email: email.value.trim(),
        message: message.value.trim()
      };
  
      alert("Form submitted successfully!\n\n" + JSON.stringify(data, null, 2));
  
      // Optional AJAX
      /*
      fetch('your-server-endpoint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(resData => console.log('Submitted:', resData))
      .catch(err => console.error('Submission error:', err));
      */
    }
  });
  
  // Real-time phone number input validation (digits only)
  document.getElementById('phone').addEventListener('input', function () {
    const phoneInput = this;
    const cleanedValue = phoneInput.value.replace(/\D/g, ''); // Remove all non-digits
  
    if (phoneInput.value !== cleanedValue) {
      phoneInput.value = cleanedValue;
    }
  
    const formGroup = phoneInput.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    errorMessage.style.display = 'none';
    phoneInput.style.borderColor = '#ccc';
  });
  
  // Error display function
  function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    input.style.borderColor = 'red';
  }
  
  // Clear all error messages and reset input borders
  function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
    document.querySelectorAll('input, textarea').forEach(el => el.style.borderColor = '#ccc');
  }
  