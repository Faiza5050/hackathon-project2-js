import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = loginForm['username'].value;
  const password = loginForm['password'].value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

      const user = userCredential.user;
      alert('Login successful!');
      window.location.href = 'dashboard.html'; // Redirect to dashboard
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});
