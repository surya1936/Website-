document.addEventListener('DOMContentLoaded', function () {
    let isPhoneVerified = false;
    let isEmailVerified = false;

    const verifyPhoneBtn = document.getElementById('verify-phone-btn');
    const verifyEmailBtn = document.getElementById('verify-email-btn');

    function showMessage(message, type = 'error') {
        const msg = document.getElementById('message');
        msg.textContent = message;
        msg.style.color = type === 'success' ? 'green' : 'red';
    }

    function checkLoginEligibility() {
        if (isPhoneVerified || isEmailVerified) {
            showMessage('Login successful!', 'success');
            console.log('User logged in successfully');

            // Save user identity to localStorage
            if (isPhoneVerified) {
                const phone = document.getElementById('phone-number').value;
                localStorage.setItem("user_id", phone);
            } else if (isEmailVerified) {
                const email = document.getElementById('email-address').value;
                localStorage.setItem("user_id", email);
            }

            // Redirect to homepage
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            showMessage('Please verify either your phone or email to log in.');
        }
    }

    function verifyPhoneOTP(phoneNumber, otp) {
        verifyPhoneBtn.disabled = true;
        verifyPhoneBtn.textContent = 'Verifying...';

        setTimeout(() => {
            if (/^\d+$/.test(otp)) {
                showMessage('Phone verified successfully!', 'success');
                isPhoneVerified = true;
                console.log('Phone verified:', phoneNumber);
            } else {
                showMessage('Invalid OTP. Please try again.');
                isPhoneVerified = false;
            }

            verifyPhoneBtn.disabled = false;
            verifyPhoneBtn.textContent = 'Log In';
            checkLoginEligibility();
        }, 1500);
    }

    function sendVerificationEmail(email) {
        verifyEmailBtn.disabled = true;
        verifyEmailBtn.textContent = 'Sending...';

        setTimeout(() => {
            showMessage('Verification link sent to your email!', 'success');
            isEmailVerified = true;
            console.log('Email verified:', email);
            verifyEmailBtn.disabled = false;
            verifyEmailBtn.textContent = 'Send Verification Link';
            checkLoginEligibility();
        }, 1500);
    }

    // Event Listeners (ensure these elements exist)
    if (verifyPhoneBtn) {
        verifyPhoneBtn.addEventListener('click', () => {
            const phone = document.getElementById('phone-number').value;
            const otp = document.getElementById('phone-otp').value;
            verifyPhoneOTP(phone, otp);
        });
    }

    if (verifyEmailBtn) {
        verifyEmailBtn.addEventListener('click', () => {
            const email = document.getElementById('email-address').value;
            sendVerificationEmail(email);
        });
    }
});
// function checkLoginEligibility() {
//     if (isPhoneVerified || isEmailVerified) {
//         const userIdentifier = isPhoneVerified
//             ? document.getElementById("phone").value
//             : document.getElementById("email").value;

//         // Save user identifier in localStorage
//         localStorage.setItem("loggedInUser", userIdentifier);

//         showMessage('Login successful!', 'success');
//         console.log('User logged in successfully');

//         // Redirect to homepage
//         window.location.href = "html folder/frontpage.html";
//     } else {
//         showMessage('Please verify either your phone or email to log in.');
//     }
// }

