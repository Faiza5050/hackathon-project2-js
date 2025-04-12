import { 
    auth, 
    db 
  } from './firebase.js';
  import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut,
    onAuthStateChanged
  } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";
  
  const loginForm = document.querySelector('#loginForm');
  const signupForm = document.querySelector('#signupForm');
  const authError = document.querySelector('#authError');
  const switchToLogin = document.querySelector('#switchToLogin');
  const switchToSignup = document.querySelector('#switchToSignup');
  
  if (switchToLogin && switchToSignup) {
    switchToLogin.addEventListener('click', (e) => {
      e.preventDefault();
      loginForm.classList.remove('hidden');
      signupForm.classList.add('hidden');
    });
  
    switchToSignup.addEventListener('click', (e) => {
      e.preventDefault();
      loginForm.classList.add('hidden');
      signupForm.classList.remove('hidden');
    });
  }
  
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = loginForm['loginEmail'].value;
      const password = loginForm['loginPassword'].value;
  
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          window.location.href = 'index.html';
        })
        .catch(err => {
          authError.textContent = err.message;
        });
    });
  }
  
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = signupForm['signupEmail'].value;
      const password = signupForm['signupPassword'].value;
  
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          window.location.href = 'index.html';
        })
        .catch(err => {
          authError.textContent = err.message;
        });
    });
  }
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const authLinks = document.querySelectorAll('.auth-link');
      authLinks.forEach(link => {
        link.innerHTML = '<a href="#" id="logout">Logout</a>';
      });
      
      document.querySelector('#logout')?.addEventListener('click', (e) => {
        e.preventDefault();
        signOut(auth).then(() => {
          window.location.href = 'auth.html';
        });
      });
    } else {
      const authLinks = document.querySelectorAll('.auth-link');
      authLinks.forEach(link => {
        link.innerHTML = '<a href="auth.html">Login/Signup</a>';
      });
    }
  });
