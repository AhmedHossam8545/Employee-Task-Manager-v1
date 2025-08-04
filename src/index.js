import { app } from './firebase-config.js';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';

const auth = getAuth(app);

function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Registered successfully!");
    })
    .catch((error) => {
      alert(error.message);
    });
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Logged in!");
    })
    .catch((error) => {
      alert(error.message);
    });
}

function logout() {
  signOut(auth).then(() => {
    alert("Logged out");
  });
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('register-btn').addEventListener('click', register);
  document.getElementById('login-btn').addEventListener('click', login);
  document.getElementById('logout-btn').addEventListener('click', logout);
});

onAuthStateChanged(auth, (user) => {
  const info = document.getElementById("user-info");
  if (user) {
    info.innerHTML = `<p>Welcome, ${user.email}</p>`;
  } else {
    info.innerHTML = "<p>No user logged in</p>";
  }
});
