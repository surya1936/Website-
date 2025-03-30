// Validate Email Format
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Toggle between Login & Signup Forms
document.getElementById("toggle-signup").addEventListener("click", function () {
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("signup-form").classList.remove("hidden");
    document.getElementById("form-title").textContent = "Sign Up";
});

document.getElementById("toggle-login").addEventListener("click", function () {
    document.getElementById("signup-form").classList.add("hidden");
    document.getElementById("login-form").classList.remove("hidden");
    document.getElementById("form-title").textContent = "Login";
});

// Signup Form Validation & Save Data
document.getElementById("signup-form").addEventListener("submit", function (event) {
    const usernameInput = document.getElementById("signup-username");
    const usernameError = document.getElementById("signup-username-error");

    const emailInput = document.getElementById("signup-email");
    const emailError = document.getElementById("signup-email-error");

    let valid = true;

    // Username Validation
    if (usernameInput.value.length < 3) {
        usernameError.style.display = "block";
        valid = false;
    } else {
        usernameError.style.display = "none";
    }

    // Email Validation
    if (!validateEmail(emailInput.value)) {
        emailError.style.display = "block";
        valid = false;
    } else {
        emailError.style.display = "none";

        // Save valid email in local storage
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(emailInput.value);
        localStorage.setItem("users", JSON.stringify(users));
    }

    if (!valid) event.preventDefault(); // Stop submission if errors exist
});

// Login Form Validation (Check if Email Exists)
document.getElementById("login-form").addEventListener("submit", function (event) {
    const emailInput = document.getElementById("login-email");
    const emailError = document.getElementById("login-email-error");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (!users.includes(emailInput.value)) {
        emailError.style.display = "block";
        event.preventDefault(); // Stop submission
    } else {
        emailError.style.display = "none";
    }
});

// Google Sign-in Simulation
function googleSignIn() {
    alert("Google Sign-In is not implemented yet.");
}

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let responseMessage = document.getElementById("response-message");

    if (name === "" || email === "" || message === "") {
        responseMessage.style.color = "red";
        responseMessage.textContent = "Please fill out all fields.";
        return;
    }

    // Simple email validation
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        responseMessage.style.color = "red";
        responseMessage.textContent = "Please enter a valid email address.";
        return;
    }

    responseMessage.style.color = "green";
    responseMessage.textContent = "Message sent successfully!";
    
    // Reset form after submission
    document.getElementById("contact-form").reset();
});
