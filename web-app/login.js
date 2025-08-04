
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
    import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

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

    window.login = function () {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const message = document.getElementById("message");

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          message.style.color = "green";
          message.innerText = "Login successful!";
          console.log("Logged in user:", userCredential.user);
          // Optionally redirect to home or dashboard:
          // window.location.href = "home.html";
        })
        .catch((error) => {
          message.style.color = "red";
          message.innerText = "Error: " + error.message;
        });
    };