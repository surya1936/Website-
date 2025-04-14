import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const auth = getAuth();
signOut(auth).then(() => {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'frontpage.html';
}).catch((error) => {
  console.error("Logout error:", error);
  window.location.href = 'frontpage.html';
});