// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAXIeEP2p9LqAGlgYICnBLbIoIMMYjuUto",
  authDomain: "login-6da90.firebaseapp.com",
  projectId: "login-6da90",
  storageBucket: "login-6da90.firebasestorage.app",
  messagingSenderId: "671187506845",
  appId: "1:671187506845:web:88298068a89aca22eba674"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Function to show messages
function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(() => {
    messageDiv.style.opacity = 0;
  }, 5000);
}

// Sign Up functionality
const signUpForm = document.getElementById('signUpForm');
signUpForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const firstName = document.getElementById('fName').value;
  const lastName = document.getElementById('lName').value;
  const email = document.getElementById('rEmail').value;
  const password = document.getElementById('rPassword').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user data to Firestore
    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email
    };
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, userData);

    showMessage('Account created successfully!', 'signUpMessage');
    window.location.href = 'index.html';  // Redirect to login page

  } catch (error) {
    showMessage(error.message, 'signUpMessage');
  }
});

// Sign In functionality with reCAPTCHA
const signInForm = document.getElementById('signInForm');
signInForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('signInemail').value;
  const password = document.getElementById('signInpassword').value;

  // ✅ Check reCAPTCHA
  const recaptchaResponse = grecaptcha.getResponse();
  if (!recaptchaResponse) {
    showMessage('Please complete the reCAPTCHA', 'signInMessage');
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user data in localStorage
    localStorage.setItem('loggedInUserId', user.uid);

    showMessage('Login successful', 'signInMessage');
    grecaptcha.reset(); // Reset reCAPTCHA after success
    window.location.href = 'home.html'; // Redirect to homepage

  } catch (error) {
    console.error("Signin Error: ", error);
    switch (error.code) {
      case 'auth/user-not-found':
        alert("No account found with this email.");
        break;
      case 'auth/wrong-password':
        alert("Incorrect password. Please try again.");
        break;
      case 'auth/invalid-email':
        alert("Please enter a valid email address.");
        break;
      default:
        alert("Something went wrong. Please try again.");
    }
    grecaptcha.reset(); // Reset reCAPTCHA after failure
  }
});

// // Google Sign-In functionality
// const googleProvider = new GoogleAuthProvider();

// // Function to handle Google Sign-In
// async function handleGoogleSignIn() {
//   try {
//     const result = await signInWithPopup(auth, googleProvider);
//     const user = result.user;

//     // Save user data to Firestore
//     const docRef = doc(db, "users", user.uid);
//     const userData = {
//       firstName: user.displayName?.split(" ")[0] || "",
//       lastName: user.displayName?.split(" ")[1] || "",
//       email: user.email
//     };
//     await setDoc(docRef, userData, { merge: true });

//     // Store user ID in localStorage
//     localStorage.setItem('loggedInUserId', user.uid);

//     // Show success message
//     showMessage('Google Sign-In successful!', 'signInMessage');

//     // Redirect to home page
//     window.location.href = 'home.html';
//   } catch (error) {
//     // Show error message if Google Sign-In fails
//     showMessage('Google Sign-In failed: ' + error.message, 'signInMessage');
//   }
// }

// // Attach the same event listener to both Google Sign-In buttons
// document.getElementById('googleSignInBtnUp')?.addEventListener('click', handleGoogleSignIn);
// document.getElementById('googleSignInBtnIn')?.addEventListener('click', handleGoogleSignIn);

// Toggle Sign In / Sign Up forms
document.getElementById('signInButton').addEventListener('click', () => {
  document.getElementById('signup').style.display = 'none';
  document.getElementById('signIn').style.display = 'block';
});

document.getElementById('signUpButton').addEventListener('click', () => {
  document.getElementById('signIn').style.display = 'none';
  document.getElementById('signup').style.display = 'block';
});
