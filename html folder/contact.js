document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name');
  const phone = document.getElementById('phone');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  const countryCode = document.getElementById('countryCode');

  let isValid = true;
  clearErrors();

  // Validate Name
  if (name.value.trim().length < 3) {
    showError(name, "Name must be at least 3 characters.");
    isValid = false;
  }

  // Validate Phone
  const phoneValue = phone.value.trim();
  if (!/^\d+$/.test(phoneValue)) {
    showError(phone, "Phone number must contain digits only.");
    isValid = false;
  } else if (phoneValue.length < 7 || phoneValue.length > 15) {
    showError(phone, "Phone number must be between 7 and 15 digits.");
    isValid = false;
  }

  // Validate Email
  const emailValue = email.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    showError(email, "Invalid email format.");
    isValid = false;
  }

  // Validate Message
  if (message.value.trim().length < 10) {
    showError(message, "Message must be at least 10 characters.");
    isValid = false;
  }

  if (isValid) {
    const formData = new FormData();
    formData.append('name', name.value.trim());
    formData.append('phone', countryCode.value + phone.value.trim());
    formData.append('email', email.value.trim());
    formData.append('message', message.value.trim());

    // Submit to external form handler
    fetch('https://submit-form.com/yH8z5HBVQ', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (response.ok) {
          alert('Form submitted successfully!');
          document.getElementById('contactForm').reset();
        } else {
          alert('Form submission failed. Please try again.');
        }
      })
      .catch(error => {
        console.error('Submission error:', error);
        alert('Error submitting form.');
      });
  }
});

// Phone input should accept only digits
document.getElementById('phone').addEventListener('input', function () {
  const cleaned = this.value.replace(/\D/g, '');
  if (this.value !== cleaned) {
    this.value = cleaned;
  }

  const formGroup = this.closest('.form-group');
  const errorMessage = formGroup.querySelector('.error-message');
  errorMessage.style.display = 'none';
  this.style.borderColor = '#ccc';
});

// Show error message
function showError(input, message) {
  const formGroup = input.closest('.form-group');
  const errorMessage = formGroup.querySelector('.error-message');
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
  input.style.borderColor = 'red';
}

// Clear all errors
function clearErrors() {
  document.querySelectorAll('.error-message').forEach(el => {
    el.textContent = '';
    el.style.display = 'none';
  });
  document.querySelectorAll('input, textarea').forEach(el => {
    el.style.borderColor = '#ccc';
  });
}
