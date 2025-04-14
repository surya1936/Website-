// Show popup when scrolled 300px
window.addEventListener('scroll', () => {
  const scrollPopup = document.getElementById("signup");
  if (window.scrollY > 300) {
    scrollPopup.classList.add("show");
  }
});

// Toggle Sign In / Sign Up
document.getElementById("signUpButton").addEventListener("click", () => {
  document.getElementById("signup").classList.add("show");
  document.getElementById("signIn").classList.remove("show");
});

document.getElementById("signInButton").addEventListener("click", () => {
  document.getElementById("signIn").classList.add("show");
  document.getElementById("signup").classList.remove("show");
});

// Optional: click outside to close
window.addEventListener("click", (e) => {
  const signIn = document.getElementById("signIn");
  const signUp = document.getElementById("signup");
  
  // Check if the click was outside of the forms
  if (!signIn.contains(e.target) && !signUp.contains(e.target)) {
    // Only close the forms if neither form was clicked
    signIn.classList.remove("show");
    signUp.classList.remove("show");
  }
});

// To prevent the form from closing when clicked inside
document.getElementById("signup").addEventListener("click", (e) => {
  e.stopPropagation();  // Prevent click from propagating up to window
});

document.getElementById("signIn").addEventListener("click", (e) => {
  e.stopPropagation();  // Prevent click from propagating up to window
});






import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// ✅ Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAXIeEP2p9LqAGlgYICnBLbIoIMMYjuUto",
  authDomain: "login-6da90.firebaseapp.com",
  projectId: "login-6da90",
  storageBucket: "login-6da90.appspot.com",
  messagingSenderId: "671187506845",
  appId: "1:671187506845:web:88298068a89aca22eba674"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Initialize EmailJS
emailjs.init("LmyLA-lu2HdBvS0LQ"); // Your public key

// ✅ Google Provider with Account Selection Prompt
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

// 📝 SIGN UP
document.getElementById("signUpForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("rEmail").value;
  const password = document.getElementById("rPassword").value;
  const fName = document.getElementById("fName").value;
  const lName = document.getElementById("lName").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      localStorage.setItem("user", JSON.stringify({
        name: `${fName} ${lName}`,
        email: email
      }));

      // ✅ Send Welcome Email
      emailjs.send("service_5r2cadm", "template_hty85vh", {
        name: `${fName} ${lName}`,
        email: email
      }).then(() => {
        console.log("Welcome email sent ✅");
      }).catch((err) => {
        console.error("Email send failed ❌", err);
      });
      

      window.location.href = "home.html";
    })
    .catch((error) => {
      alert("Signup Error: " + error.message);
    });
});

// 🔐 SIGN IN
document.getElementById("signInForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("signInemail").value;
  const password = document.getElementById("signInpassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      localStorage.setItem("user", JSON.stringify({
        name: user.displayName || "User",
        email: user.email
      }));

      // ✅ Send Login Notification Email
      emailjs.send("service_5r2cadm", "template_hty85vh", {
        name: user.displayName || "User",
        email: user.email
      }).then(() => {
        console.log("Login email sent ✅");
      }).catch((err) => {
        console.error("Login email send failed ❌", err);
      });
      

      window.location.href = "home.html";
    })
    .catch((error) => {
      alert("Signin Error: " + error.message);
    });
});

// 🌐 GOOGLE LOGIN
function googleLogin() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;

      localStorage.setItem("user", JSON.stringify({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
      }));

      // ✅ Send Google Login Email
      emailjs.send("service_5r2cadm", "template_hty85vh", {
        name: user.displayName,
        email: user.email
      }).then(() => {
        console.log("Google Login Email Sent");
      }).catch((err) => {
        console.error("EmailJS Google Login Error:", err);
      });

      window.location.href = "home.html";
    })
    .catch((error) => {
      alert("Google Login Error: " + error.message);
    });
}

// ✅ Connect Google Buttons
document.getElementById("googleSignInBtnUp").addEventListener("click", googleLogin);
document.getElementById("googleSignInBtnIn").addEventListener("click", googleLogin);
// Toggle Sign In / Sign Up forms
document.getElementById('signInButton').addEventListener('click', () => {
  document.getElementById('signup').style.display = 'none';
  document.getElementById('signIn').style.display = 'block';
});

document.getElementById('signUpButton').addEventListener('click', () => {
  document.getElementById('signIn').style.display = 'none';
  document.getElementById('signup').style.display = 'block';
});