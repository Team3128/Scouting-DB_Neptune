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
  var robotData;
  var searchState = true;

  cacheRobotData() 

  function search(team) {
    let teamList = Object.keys(robotData);
    if (!teamList.includes(team)) {
        alert("Robot doesn't exist")
        return;
    }
    document.getElementById("miscData").innerHTML = "";
    document.getElementById("graphContainer").innerHTML = "";
    document.getElementById("dataContainer").innerHTML = "";
    document.getElementById("qataContainer").innerHTML = "";

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
  window.onload=function(){
    document.getElementById("searchbar").addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        console.log("enter pressed")
          event.preventDefault();
          if (currentTab == "search") {
            search(document.getElementById("searchbar").value)
          }
      }
    })
  }
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
  var color_tracker = ["b1","b2","b3","r1","r2","r3"]

  //ranking table generation
  let ranktbl = document.createElement("table");
  let rankthead = document.createElement("thead")
  ranktbl.appendChild(rankthead)
  let ranktblBody = document.createElement("tbody");
  let rankheadRow = document.createElement("tr")
  rankthead.appendChild(rankheadRow)
  ranktbl.appendChild(ranktblBody);
  //creating the rank labels
  function rank_tableHead(){
    for(var b =0; b<rank_HeadNames.length; b++){
      const headCell = document.createElement("th");
      rankheadRow.appendChild(headCell);
      headCell.classList.add("headCell")
      headCell.setAttribute("id", `head_cell_${b}`)
      headCell.innerHTML = rank_HeadNames[b]
    }
    document.getElementById("rank-container").appendChild(ranktbl);
  }

  //general table generation
  let tbl = document.createElement("table");
  let thead = document.createElement("thead")
  tbl.appendChild(thead)
  let tblBody = document.createElement("tbody");
  let headRow = document.createElement("tr")
  thead.appendChild(headRow)
  tbl.appendChild(tblBody);
  //creating the table labels
  function table_tableHead(){
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
    document.getElementById("table-container").appendChild(tbl);
  }

  //general match data
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
  //ranking data
  onValue(ref(db, 'Events/Test2022/Robots/'), (snapshot)=>{
    const over = snapshot.val()
    var objNames = Object.keys(over)
    var sort_arr = [];
    for(var r=0;r<objNames.length;r++){
    var data = over[objNames[r]];
    var keyNames = Object.keys(data)
    var total_value = 0;
    var avg_temp={}
    for(var i=0; i<val_tracker.length;i++){
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
    ranktblBody.innerHTML = ""
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
          ranktblBody.appendChild(row)
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
  table_tableHead()
  rank_tableHead()

  