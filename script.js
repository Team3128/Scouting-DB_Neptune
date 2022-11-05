
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
const database = to(app);
console.log("success")

const db = to();

  var robotData;
  var robot_pitData;
  var robot_imgData;
  var searchState = true;

     function load(){
       pr(sr(db, "Events/BB2022/Robots")).then((snapshot) => {
        robotData = snapshot.val()
        console.log(robotData)
      })
       pr(sr(db, "Events/BB2022/Pitscout")).then((snapshot) => {
        robot_pitData = snapshot.val()
        console.log(robot_pitData)
      })
       pr(sr(db, "Events/BB2022/Image")).then((snapshot) => {
        robot_imgData = snapshot.val()
        console.log(robot_imgData)
      })
    }

  function search(team) {
    load()
    let robotList = Object.keys(robotData);
    let pitlist = Object.keys(robot_pitData);
    let imglist = Object.keys(robot_imgData);
    if (!robotList.includes(team) && !pitlist.includes(team) && !imglist.includes(team)) {
        alert("Robot doesn't exist")
        return;
    }

    document.getElementById("miscData").innerHTML = "";
    document.getElementById("graphContainer").innerHTML = "";
    document.getElementById("dataContainer").innerHTML = "";
    document.getElementById("qataContainer").innerHTML = "";
    document.getElementById("imgContainer").innerHTML = "";
    document.getElementById("pitsData").innerHTML = "";

    if (searchState) {
        document.getElementById("searchbar").classList.remove("searchmain");
        document.getElementById("searchbar").classList.add("searchbar");
        searchState = false;
    }


    if(robotList.includes(team)){
      var teamData = robotData[team]
    var matches = Object.keys(teamData)
      //misc 
  
    let misc_container = document.getElementById("miscData"); //change later to array, not object. really fucking scrappy code v2
    let misc_arr = [
        ["Drivetrain", "Shooter"],
        [teamData[matches[0]]["Drivetrain Type"], teamData[matches[0]]["Shooter Type"]]
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
    //tbl.setAttribute("border", "2");

    //graph
    var graphLabels = ["Taxi", "Auto High", "Tele High", "Climb Level", "Defence Time"]
    var marksData = {
      labels: graphLabels,
      datasets: [{
        label: team,
        backgroundColor: "rgba(255,0,0,0.2)",
        data: [
          robot_avg_tracker[team]["Taxi"],
          robot_avg_tracker[team]["Auto High"],
          robot_avg_tracker[team]["Tele High"],
          robot_avg_tracker[team]["Climb Level"],
          robot_avg_tracker[team]["Defence Time"]
      ]
      }
    ]
    }
    var holder = document.createElement("canvas")
    var robotChart = new Chart(holder, {
        type: "radar",
        data: marksData,
        options:{

        }
    })
    document.getElementById("graphContainer").appendChild(holder)

    
    //data
    var data_display = [
      "ZMatch Number",
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
      "Oof"
    ];
    let tb2 = document.createElement("table");
  let tb2thead = document.createElement("thead")
  tb2.appendChild(tb2thead)
  let tb2Body = document.createElement("tbody");
  let tb2headRow = document.createElement("tr")
  tb2thead.appendChild(tb2headRow)
  tb2.appendChild(tb2Body);
    for(var b =0; b<data_display.length; b++){
      const headCell = document.createElement("th");
      tb2headRow.appendChild(headCell);
      headCell.classList.add("headCell")
      headCell.setAttribute("id", `head_cell_${b}`)
      headCell.innerHTML = data_display[b]
    }
    document.getElementById("dataContainer").appendChild(tb2);
    for(var f=0;f<matches.length;f++){
       var row = document.createElement("tr");
      for(var g=0;g<data_display.length;g++){
        const cellText = document.createElement("div");
        const pushinP = document.createElement("p");
        const cell = document.createElement("td");
  
        pushinP.innerHTML = teamData[matches[f]][data_display[g]];
  
        row.appendChild(cell);
        cell.appendChild(cellText);
        cellText.appendChild(pushinP);
        //console.log(data[color[i]][j+1][headNames[g]])
        
        let color = teamData[matches[f]]["Alliance Color"][0];
        row.style.backgroundColor = "var(--" + color + ")"
        row.style.color = "var(--text-color)"
  
      }
      tb2.appendChild(row)
    }
  
    
    //qata
    let tb3 = document.createElement("table");
    let tb3thead = document.createElement("thead")
    tb3.appendChild(tb3thead)
    let tb3Body = document.createElement("tbody");
    let tb3headRow = document.createElement("tr")
    tb3thead.appendChild(tb3headRow)
    tb3.appendChild(tb3Body);
    var headCell = document.createElement("th");
    tb3headRow.appendChild(headCell);
    headCell.classList.add("headCell")
    headCell.setAttribute("id", `head_cell_${b}`)
    headCell.innerHTML = "Matches"
    headCell = document.createElement("th");
    tb3headRow.appendChild(headCell);
    headCell.classList.add("headCell")
    headCell.setAttribute("id", `head_cell_${b}`)
    headCell.innerHTML = "QATA"
    tb3.appendChild(tb3Body);
    for(var d=0;d<matches.length;d++){
      var row = document.createElement("tr");
      var cellText = document.createElement("div");
      var pushinP = document.createElement("p");
      var cell = document.createElement("td");
  
      pushinP.innerHTML = matches[d];
  
      row.appendChild(cell);
      cell.appendChild(cellText);
      cellText.appendChild(pushinP);

      cellText = document.createElement("div");
      pushinP = document.createElement("p");
      cell = document.createElement("td");
  
      pushinP.innerHTML = teamData[matches[d]]["QATA"];
  
      row.appendChild(cell);
      cell.appendChild(cellText);
      cellText.appendChild(pushinP);
      tb3Body.appendChild(row)
    }

    document.getElementById("qataContainer").appendChild(tb3);
    
    
    }else{
      document.getElementById("miscData").innerHTML = "NO MISC AVAILABLE YET";
    document.getElementById("graphContainer").innerHTML = "NO GRAPH AVAILABLE YET";
    document.getElementById("dataContainer").innerHTML = "NO DATA AVAILABLE YET";
    document.getElementById("qataContainer").innerHTML = "NO QATA AVAILABLE YET";
    }
    if(imglist.includes(team)){
      var imgData = robot_imgData[team]
      var imgamount = Object.keys(imgData)
      if (imgamount.length != 0) {
        let link = imgData[imgamount[0]]["Image of Robot"]
        let container = document.getElementById("imgContainer");
        let image = document.createElement("img");
        image.src = link
        container.appendChild(image)
      }
    }else{
      document.getElementById("imgContainer").innerHTML = "NO IMAGE AVAILABLE YET";
    }
    if(pitlist.includes(team)){
      var pitData = robot_pitData[team]
      let pits_container = document.getElementById("pitsData"); //change later to array, not object. really fucking scrappy code v2
      var pitstuff = ["Robot Weight", "Drivetrain Motors", "Motor Type"]

      var pitDatatimes = Object.keys(pitData)
      var weight = false;
      var motornum = false;
      var motortyp = false;
      var temp_trac = ["NA","NA","NA"]
      for(var e=0;e<pitDatatimes.length;e++){
        if(weight && motornum && motortyp){
          break;
        }
        if(pitData[pitDatatimes[e]]["Robot Weight"] != "None"){
          temp_trac[0] = (pitData[pitDatatimes[e]]["Robot Weight"])
          weight = true;
        }
        if(pitData[pitDatatimes[e]]["Number of Motors FOR DRIVETRAIN"] != "None"){
          temp_trac[1] = (pitData[pitDatatimes[e]]["Number of Motors FOR DRIVETRAIN"])
          motornum = true;
        }
        if(pitData[pitDatatimes[e]]["Motor Type"] != "None"){
          temp_trac[2] = (pitData[pitDatatimes[e]]["Motor Type"])
          motortyp = true;
        }
      }
    let misc_arr = [
        pitstuff,
        temp_trac
    ]
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");
    for (let i = 0; i < 3; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 2; j++) {
            const cell = document.createElement("td");
            cell.innerHTML = misc_arr[j][i];
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    pits_container.appendChild(tbl);
    }else{
      document.getElementById("pitsData").innerHTML = "NO PIT DATA AVAILABLE YET";
    }
    

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
  ranktbl.setAttribute("id", "ranktbl");
  let rankthead = document.createElement("thead");
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
  vr(sr(db, 'Events/BB2022/Matches/'), (snapshot)=>{
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
  yr(sr(db, 'Events/BB2022/Robots/'), (snapshot)=>{
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

  