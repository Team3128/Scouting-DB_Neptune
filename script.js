import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";
import { getDatabase, ref, onValue, get, set, onChildChanged, onChildAdded} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js"
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
  var headNames = [
  "ZMatch Number",
  "ZTeam",
  "Scout Name",
  "Alliance Color",
  "Taxi",
  "Auto High",
  "Auto Low",
  "Auto Missed",
  "Tele High",
  "Tele Low",
  "Tele Missed",
  "Attempted Climb",
  "Climb Level",
  "Climb Time",
  "Defence Time",
  "Penalty",
  "Yeet",
  "Oof",
  "QATA",
  "Drivetrain Type",
  "Shooter Type",
];
  const tbl = document.createElement("table");
  const thead = document.createElement("thead")
  tbl.appendChild(thead)
  const tblBody = document.createElement("tbody");
  const headRow = document.createElement("tr")
  thead.appendChild(headRow)
  function tableHead(){
    for(var b =0; b<headNames.length; b++){
      const headCell = document.createElement("th");
      headRow.appendChild(headCell);
      headCell.classList.add("headCell")
      headCell.setAttribute("id", `head_cell_${b}`)
      headCell.innerHTML = headNames[b]
    }
    document.getElementById("tableContainer").appendChild(tbl);
  }

  onChildAdded(ref(db, 'Events/Test2022/Matches/'), (snapshot)=>{
    const data = snapshot.val()
    console.log(data)
    let color = data["Alliance Color"][0]
    const row = document.createElement("tr");

        for(var g=0;g<headNames.length;g++){

          const cellText = document.createElement("div");
          const pushinP = document.createElement("p");
          const cell = document.createElement("td");
          pushinP.innerHTML = data[headNames[g]];

          row.appendChild(cell);
          cell.appendChild(cellText);
          cellText.appendChild(pushinP);
          tblBody.appendChild(row);
          tbl.appendChild(tblBody);
          //console.log(data[color[i]][j+1][headNames[g]])

          row.style.backgroundColor = "var(--" + color + ")"
          row.style.color = "var(--text-color)"
        }

  })


tableHead()
