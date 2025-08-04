
  
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
    import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

     const firebaseConfig = {
    apiKey: "AIzaSyCBvefflN0iL7_6B9xZMF8v8fm-Z4wSMW8",
    authDomain: "pipico-4977f.firebaseapp.com",
    databaseURL: "https://pipico-4977f-default-rtdb.firebaseio.com",
    projectId: "pipico-4977f",
    storageBucket: "pipico-4977f.firebasestorage.app",
    messagingSenderId: "1017200026188",
    appId: "1:1017200026188:web:2c1956d8adec06622c0ae9"
  };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    window.signup = function () {
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;
      const fullName = document.getElementById("fullname").value.trim();
      const termsChecked = document.getElementById("terms").checked;
      const message = document.getElementById("message");

      message.style.color = "red";

      // Basic validations
      if (!email || !password || !confirmPassword || !fullName) {
        message.innerText = "Please fill in all required fields.";
        return;
      }

      if (password !== confirmPassword) {
        message.innerText = "Passwords do not match.";
        return;
      }

      if (!termsChecked) {
        message.innerText = "You must agree to the terms and conditions.";
        return;
      }

      // Create account
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          // Optionally update display name
          updateProfile(user, {
            displayName: fullName
          });

          message.style.color = "green";
          message.innerText = "Account created successfully!";
          console.log("User:", user);

          // Optionally redirect to login
          // window.location.href = "login.html";
        })
        .catch((error) => {
          message.innerText = "Error: " + error.message;
        });
    };
 