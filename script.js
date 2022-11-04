import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import {
  getAnalytics
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";
import {
  getDatabase,
  ref,
  onValue,
  get,
  set
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js"
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

var currentPage = 1;
var searchState = true;

// for(let i=0; i<6; i++){
//   document.getElementById(`nav${i}`).addEventListener("click", pageChange(i))
// }
function pageChange(i) {
  let viewpage = document.getElementsByClassName("viewpage");
  console.log("triggered")
  viewpage.forEach((elem) => {
      elem.style.display = "none";
  })
}

document.getElementById("searchbar").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
      event.preventDefault();
      if (currentPage == 1) {
          search(document.getElementById("searchbar").value)

      }
  }
})


//AFTER LOAD FUNCTIONS
const db = getDatabase();
cacheRobotData() //Caches robot data right after page load

function search(team) {
  let teamList = Object.keys(robotData);
  if (!teamList.includes(team)) {
      alert("Robot doesn't exist")
      return;
  }
  if (searchState) {
      document.getElementById("searchbar").classList.remove("searchmain");
      document.getElementById("searchbar").classList.add("searchbar");
      searchState = false;
  }
  let teamData = Object.values(robotData) //really fucking scrappy code change this after BB, instead of convert to array use the object
  teamData = teamData[teamList.indexOf(team)];

  let pitscoutKeys = null;
  let pitscout = null;
  if (typeof teamData.Pitscouting == "undefined") {
      document.getElementById("imgContainer").innerHTML = "Err 01: Image Not Found"
  } else {
      pitscoutKeys = Object.keys(teamData.Pitscouting);
      pitscout = Object.values(teamData.Pitscouting);
      let teamDataArr = []
  }
  //image

  if (pitscout != null) {
      let pitscoutData = pitscout.splice(-1)
      console.log(pitscoutData);
      let container = document.getElementById("imgContainer");
      let image = document.createElement("img");
      // WORK IN PROGRESS, wait for pitscout data structure to be unfucked
  }

  //misc 

  console.log()
  let misc_container = document.getElementById("miscData"); //change later to array, not object. really fucking scrappy code v2
  let misc_arr = [
      ["Drivetrain", "Shooter"],
      [teamData.Scouting[Object.keys(teamData.Scouting)[0]]["Drivetrain Type"], teamData.Scouting[Object.keys(teamData.Scouting)[0]]["Shooter Type"]]
  ]
  const tbl = document.createElement("table");
  const tblBody = document.createElement("tbody");
  for (let i = 0; i < 2; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 2; j++) {
          const cell = document.createElement("td");
          cell.innerHTML = misc_arr[j][i];
          row.appendChild(cell);
      }
      tblBody.appendChild(row);
  }
  tbl.appendChild(tblBody);
  misc_container.appendChild(tbl);
  tbl.setAttribute("border", "2");

  //graph
  let data = {}
  var robotChart = new Chart("graphContainer", {
      type: "radio",
      data: data,
      options: {
          elements: {
              line: {
                  borderWidth: 3
              }
          }
      },
  })

  //data
  let matches_data = teamData.Scouting;
  console.log(matches_data)
  let matches_numbers = Object.keys(matches_data);
  let matches_values = Object.values(matches_data);

  let data_keys = Object.keys(matches_values[0])
  let data_values = []
  for (let k = 0; k < matches_numbers.length; k++) {
      data_values.push(Object.values(matches_values[k]))
  }
  console.log(matches_numbers + '\n' + JSON.stringify(matches_values));

  const tbl2 = document.createElement("table");
  const tblBody2 = document.createElement("tbody");
  let temp_data_values = []
  for (let i = 0; i < matches_numbers.length; i++) {

      if (i == 0) {
          var removeValFrom = [8, 11, 13];
          data_keys = data_keys.filter(function(value, index) {
              return removeValFrom.indexOf(index) == -1;
          })
          const row = document.createElement("tr");
          for (let j = 0; j < data_keys.length; j++) {
              const cell = document.createElement("td");
              cell.innerHTML = data_keys[j];
              row.appendChild(cell);
          }
          tblBody2.appendChild(row);
      }
      temp_data_values[i] = stripData(data_values[i], [8, 11, 13])
      const row = document.createElement("tr");
      for (let j = 0; j < temp_data_values[i].length; j++) {

          const cell = document.createElement("td");
          cell.innerHTML = temp_data_values[i][j];
          row.appendChild(cell);
      }
      tblBody2.appendChild(row);
  }
  tbl2.appendChild(tblBody2);
  document.getElementById("dataContainer").appendChild(tbl2);

  
  //qata
  const tbl3 = document.createElement("table");
  const tblBody3 = document.createElement("tbody");
  console.log(matches_numbers + '\n' + JSON.stringify(matches_values));
  for (let i = 0; i < matches_numbers.length; i++) {

      if (i == 0) {
        const row = document.createElement("tr");
          for (let j = 0; j < 2; j++) {
              const cell = document.createElement("td");
              if(j == 0){
                cell.innerHTML = "Match"
              }
              else{
                cell.innerHTML = "QATA"
              }
              row.appendChild(cell);
          }
          tblBody3.appendChild(row);
      }
      const row = document.createElement("tr");
      for (let j = 0; j < 2; j++) {

          const cell = document.createElement("td");
          if(j==0){
            cell.innerHTML = data_values[i][19]
          }
          else{
            cell.innerHTML = data_values[i][11]
          }
          row.appendChild(cell);
      }
      tblBody3.appendChild(row);
  }
  tbl3.appendChild(tblBody3);
  document.getElementById("qataContainer").appendChild(tbl3);
};

function cacheRobotData() {
  return new Promise((resolve, reject) => {
      try {
          get(ref(db, "Events/RRTest22/Robots")).then((snapshot) => {
              robotData = snapshot.val()


          })
      } catch (error) {
          console.log(error);
          alert(error);
          reject();
      }
  })
}


function generateMainTable() {
  getAllDataOnce().then((returnArr) => {
      let objKeys = returnArr[1]
      if (settings.main.skipColumnOfData) {
          let list = settings.main.skipColumnNumberList
          let tempList = []
          for (let b = 0; b < objKeys.length; b++) {
              if (list.includes(b)) {
                  //do nothing
              } else {
                  tempList.push(objKeys[b])
              }
          }
          objKeys = tempList;
      }

      let dataValues = Object.values(returnArr[0]);
      console.log(dataValues)
      const tbl = document.createElement("table");
      const tblBody = document.createElement("tbody");
      const thead = document.createElement("thead")
      tbl.appendChild(thead)
      const headRow = document.createElement("tr")
      thead.appendChild(headRow)

      //creating table head with keys
      for (let b = 0; b < objKeys.length; b++) {
          const headCell = document.createElement("th");
          headRow.appendChild(headCell);
          headCell.classList.add("headCell")
          headCell.setAttribute("id", `head_cell_${b}`)
          headCell.innerHTML = objKeys[b]
      }
      // deleting data


      // creating all cells
      for (let i = 0; i < dataValues.length; i++) {
          let temp = Object.values(dataValues[i])
          let temp2 = []
          // creates a table row
          const row = document.createElement("tr");
          if (i % 2 == 0) {
              row.classList.add("rowLight")
          }

          if (settings.main.skipColumnOfData) {
              let list = settings.main.skipColumnNumberList;

              for (let j = 0; j < list.length; j++) {
                  temp[list[j] - 2] = 'REPLACE_VALUE'
              }
              for (let j = 0; j < temp.length; j++) {
                  if (temp[j] != "REPLACE_VALUE") {
                      temp2.push(temp[j]);
                  }
              }
              temp = temp2;
          }

          for (let j = 0; j < objKeys.length; j++) {
              const cellText = document.createElement("div");
              const cell = document.createElement("td");
              if (j == 0) {
                  cellText.innerHTML = Math.floor(i / 6) + 1
              }
              if (j == 1) {
                  getapi("2022casd").then((data) => {
                      cellText.innerHTML = data[i];
                  })
              } else if (j > 1) {
                  if (j == 17) {
                      cell.style.width = "150px";
                  }
                  cellText.innerHTML = temp[j - 2]
              }
              cellText.setAttribute("id", (`cell_${i}_${j}`))
              cellText.classList.add("cell")

              row.appendChild(cell);
              cell.appendChild(cellText);
          }

          // add the row to the end of the table body
          tblBody.appendChild(row);
      }

      // put the <tbody> in the <table>
      tbl.setAttribute("border", 0)
      tbl.setAttribute("cellspacing", 0)
      tbl.appendChild(tblBody);
      // appends <table> into <body>
      document.getElementById("tableContainer").appendChild(tbl);

  }).catch((error) => {
      alert(error)
      return;
  })
}


// generateMainTable()