

    //new 
    import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

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
const database = getDatabase(app);
const auth = getAuth(app);

// 🔒 Protect the page
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});

let currentRoomRef = null;

function generateRoomCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

window.createRoom = function() {
  const roomCode = generateRoomCode();
  joinRoomByCode(roomCode);
};

window.joinRoom = function() {
  const roomCode = document.getElementById('joinCode').value.trim().toUpperCase();
  if (roomCode) {
    joinRoomByCode(roomCode);
  }
};

function joinRoomByCode(roomCode) {
  document.getElementById('roomDisplay').innerText = "Room Code: " + roomCode;
  document.getElementById('chatBox').innerHTML = ''; // clear chat

  currentRoomRef = ref(database, 'chatRooms/' + roomCode);

  onChildAdded(currentRoomRef, (data) => {
    const msg = data.val();
    const msgDiv = document.createElement('div');
    msgDiv.textContent = `${msg.name}: ${msg.text}`;
    document.getElementById('chatBox').appendChild(msgDiv);
    document.getElementById('chatBox').scrollTop = chatBox.scrollHeight;
  });
}

window.sendMessage = function() {
  if (!currentRoomRef) {
    alert("Please join or create a room first.");
    return;
  }
  const name = document.getElementById('name').value.trim();
  const text = document.getElementById('message').value.trim();
  if (name && text) {
    push(currentRoomRef, { name, text });
    document.getElementById('message').value = '';
  }
};

