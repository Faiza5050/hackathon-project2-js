import { auth, db } from './firebase-config.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";

const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const fullname = signupForm['fullname'].value;
  const email = signupForm['email'].value;
  const password = signupForm['password'].value;
  const confirmPassword = signupForm['confirm-password'].value;

  if (password !== confirmPassword) {
    alert("Passwords don't match!");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        fullname: fullname,
        email: email,
        createdAt: new Date()
      });

      alert('Account created successfully!');
      window.location.href = 'dashboard.html'; // Redirect to dashboard
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});
