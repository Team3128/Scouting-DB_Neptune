import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
        import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";
        import { getDatabase, ref, onValue, get, set } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js"
        const firebaseConfig = {
          apiKey: "AIzaSyAO1aIe_fTZB6duj8YIRyYcLTINlcP196w",
          authDomain: "escouting-7b4e0.firebaseapp.com",
          databaseURL: "https://escouting-7b4e0-default-rtdb.firebaseio.com",
          projectId: "escouting-7b4e0",
          storageBucket: "escouting-7b4e0.appspot.com",
          messagingSenderId: "377179821867",
          appId: "1:377179821867:web:cedab35ab708c12986976e",
          measurementId: "G-8VWYRF9QY6"
        };
      
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        const database = getDatabase(app);


        console.log("success")
        
  const db = getDatabase();
  onValue(ref(db, 'Events/CAPH22'), (snapshot)=>{
    const data = snapshot.val()
    console.log(data)
  });
