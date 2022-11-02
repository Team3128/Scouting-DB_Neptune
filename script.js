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

  var rank_HeadNames = [
    "Rank",
    "Team",
    "Score",
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
    "Oof"
  ];
  const tbl = document.createElement("table");
  const thead = document.createElement("thead")
  tbl.appendChild(thead)
  const tblBody = document.createElement("tbody");
  const headRow = document.createElement("tr")
  thead.appendChild(headRow)
  tbl.appendChild(tblBody);

  //creating the labels
  function rank_tableHead(){
    for(var b =0; b<rank_HeadNames.length; b++){
      const headCell = document.createElement("th");
      headRow.appendChild(headCell);
      headCell.classList.add("headCell")
      headCell.setAttribute("id", `head_cell_${b}`)
      headCell.innerHTML = rank_HeadNames[b]
    }
    document.getElementById("rank").appendChild(tbl);
  }
  
  onValue(ref(db, 'Events/Test2022/Robots/'), (snapshot)=>{
    const over = snapshot.val()
    var objNames = Object.keys(over)
    var sort_arr = [];
    for(var r=0;r<objNames.length;r++){
      var data = over[objNames[r]];
      var keyNames = Object.keys(data)
    var total_value = 0;
    var avg_temp={}
    for( var i=0; i<val_tracker.length;i++){
      var temp_value = 0
      for(var j=0; j<keyNames.length; j++){
        if(val_tracker[i] == "Climb Level"){
          switch(data[keyNames[j]][val_tracker[i]]){
            case "T":
              temp_value += 15
              break;
            case "H":
              temp_value += 10
              break;
            case "M":
              temp_value +=6
              break;
            case "L":
              temp_value += 4
              break;
            case "N":
              temp_value += 0
              break;
          }
        }else{
          temp_value += parseInt(data[keyNames[j]][val_tracker[i]])
        }
      }
      temp_value/= keyNames.length
      temp_value = temp_value.toFixed(1)
      avg_temp[val_tracker[i]] = temp_value
      temp_value*= weights[weight_tracker[i]]
      temp_value*= equalizer[equalizer_tracker[i]]
      temp_value = temp_value.toFixed(1)
      total_value+=parseFloat(temp_value)
    }
    total_value = total_value.toFixed(1)
    robot_avg_tracker[data[keyNames[0]]["ZTeam"]] = avg_temp

    robot_score_tracker[data[keyNames[0]]["ZTeam"]] = total_value

    }
    var robot_score_key = Object.keys(robot_score_tracker)
    for(var d=0;d<robot_score_key.length;d++){
      if(sort_arr.indexOf(robot_score_tracker[robot_score_key[d]]) == -1){
        sort_arr.push(robot_score_tracker[robot_score_key[d]])
      }
    }
    sort_arr.sort(function(a,b){return a-b})
    var rank_counter = 1;
    tblBody.innerHTML = ""
    for(var g=sort_arr.length-1;g>=0;g--){
      for(var f=0; f<robot_score_key.length;f++){
        if(robot_score_tracker[robot_score_key[f]] == sort_arr[g]){
        var row = document.createElement("tr")
        var cellText = document.createElement("div");
          var pushinP = document.createElement("p");
          var cell = document.createElement("td");

          pushinP.innerHTML = rank_counter;
          rank_counter++;
          row.appendChild(cell);
          cell.appendChild(cellText);
          cellText.appendChild(pushinP);

          cellText = document.createElement("div");
          pushinP = document.createElement("p");
          cell = document.createElement("td");

          pushinP.innerHTML = robot_score_key[f];
          row.appendChild(cell);
          cell.appendChild(cellText);
          cellText.appendChild(pushinP);

          cellText = document.createElement("div");
          pushinP = document.createElement("p");
          cell = document.createElement("td");

          pushinP.innerHTML = robot_score_tracker[robot_score_key[f]];
          row.appendChild(cell);
          cell.appendChild(cellText);
          cellText.appendChild(pushinP);
          for(var b=0; b<val_tracker.length;b++){
            cellText = document.createElement("div");
          pushinP = document.createElement("p");
          cell = document.createElement("td");

          pushinP.innerHTML = robot_avg_tracker[robot_score_key[f]][val_tracker[b]];
          row.appendChild(cell);
          cell.appendChild(cellText);
          cellText.appendChild(pushinP);
          }
          tblBody.appendChild(row)
        }
      }
    }
    
    /*for(var g=sort_arr.length-1;g>=0;g--){
      for(var f=0; f<score_robot_tracker[sort_arr[g]].length;f++){
        console.log(score_robot_tracker[sort_arr[g]][f])
      }
    }*/

  }
  )

  rank_tableHead()
/*
  //title names
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
  "Drivetrain Type",
  "Shooter Type"
];
var color_tracker = ["b1","b2","b3","r1","r2","r3"]
  //creating the table layout
  const tbl = document.createElement("table");
  const thead = document.createElement("thead")
  tbl.appendChild(thead)
  const tblBody = document.createElement("tbody");
  const headRow = document.createElement("tr")
  thead.appendChild(headRow)
  tbl.appendChild(tblBody);

  //creating the labels
  function tableHead(){
    for(var b =0; b<headNames.length; b++){
      const headCell = document.createElement("th");
      headRow.appendChild(headCell);
      headCell.classList.add("headCell")
      headCell.setAttribute("id", `head_cell_${b}`)
      if(headNames[b] == "ZTeam" || headNames[b] == "ZMatch Number" ){
        headCell.innerHTML = headNames[b].substring(1)
      }else{
        headCell.innerHTML = headNames[b]
      }
    }
    document.getElementById("tableContainer").appendChild(tbl);
  }


  //whenever new child is added it adds it to the cell
  onChildAdded(ref(db, 'Events/Test2022/Matches/'), (snapshot)=>{
    const data = snapshot.val()
    
        if(!static_tracker.hasOwnProperty(data["ZMatch Number"])){
          var temp_obj = {}
          for(var i=0; i<6; i++){
            const row = document.createElement("tr");
            temp_obj[color_tracker[i]] = row
            for(var g=0;g<headNames.length;g++){

              const cellText = document.createElement("div");
              const cell = document.createElement("td");

              if(headNames[g] == "Alliance Color"){
                cellText.innerHTML = color_tracker[i]
              }
              else if(headNames[g] == "ZMatch Number"){
                cellText.innerHTML = data["ZMatch Number"]
              }
              else{
                cellText.innerHTML = "NA";
              }
              
              row.appendChild(cell);
              cell.appendChild(cellText);
              tblBody.appendChild(row);
              //console.log(data[color[i]][j+1][headNames[g]])
    
    
            }
          }
          static_tracker[data["ZMatch Number"]] = temp_obj;
        }

       var insert_val = static_tracker[data["ZMatch Number"]][data["Alliance Color"]]
        const row = document.createElement("tr")
        for(var g=0;g<headNames.length;g++){
          let color = data["Alliance Color"][0]
          const cellText = document.createElement("div");
          const pushinP = document.createElement("p");
          const cell = document.createElement("td");

          pushinP.innerHTML = data[headNames[g]];

          row.appendChild(cell);
          cell.appendChild(cellText);
          cellText.appendChild(pushinP);
          //console.log(data[color[i]][j+1][headNames[g]])

          row.style.backgroundColor = "var(--" + color + ")"
          row.style.color = "var(--text-color)"
        }
        tblBody.replaceChild(row, insert_val)
        static_tracker[data["ZMatch Number"]][data["Alliance Color"]] = row
  }
  )


tableHead()
*/

