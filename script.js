
//CONNECTING TO DB, change links under firebaseConfig to connect to db
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

//
//=======================
//SEARCH TAB
  var robotData;
  var robot_pitData;
  var robot_imgData;
  var searchState = true;
//gathers all the data under the path, not sure what it returns if path does not exist yet
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
//displays all the data that can be gathered
  function search(team) {
    load()
    //error appears if a path does not exist in the db, also for some reason needs to be run twice
    //the first time when trying to search for a robot
    let robotList = Object.keys(robotData);
    let pitlist = Object.keys(robot_pitData);
    let imglist = Object.keys(robot_imgData);
    //if the robot does not exist in any off the paths, tell that the robot does not exist
    if (!robotList.includes(team) && !pitlist.includes(team) && !imglist.includes(team)) {
        alert("Robot doesn't exist")
        return;
    }
    //reset the display page back to blank
    document.getElementById("miscData").innerHTML = "";
    document.getElementById("graphContainer").innerHTML = "";
    document.getElementById("dataContainer").innerHTML = "";
    document.getElementById("qataContainer").innerHTML = "";
    document.getElementById("imgContainer").innerHTML = "";
    document.getElementById("pitsData").innerHTML = "";
    //transition to display page
    if (searchState) {
        document.getElementById("searchbar").classList.remove("searchmain");
        document.getElementById("searchbar").classList.add("searchbar");
        searchState = false;
    }

    //if there is scouting app data from the robot, display it here, otherwise say that there is current none avail
    if(robotList.includes(team)){
      //gets the specific robots data
      var teamData = robotData[team]
    var matches = Object.keys(teamData)
    //as of right now it is called misc, should be changed for redability
    //displays the drive train and shooter from the match date from scouting app, code should be changed
    //to scan over the data and take the most said drivetrain/shooter, not just taking the first matches data
    let misc_container = document.getElementById("miscData"); 
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


    //displays the graph, is really janky due to lack of time, pulls robot avg from robot_avg_tracker in table cache.js
    //takes taxi, auto high, tele high, climb level and defense time avg to display
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

    
    //displays the data from the all the matches the robot played
    //this is the specific data that we want pulled from the matches
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
  //using the data_display above, it creates a table header and prepares the body for code below
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
    //this is the code that goes into the body, going match by match and adding a new row to the table body for each match
    //currentlty is not ordered by match, due to matching numbering error (01 is counted as a string, messing things up)
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
  
    
    //similar to the code above for the match data, it pulls from the same spot except this time it is just the qata
    //below for setting up the qata display is bad code, can be condensed, cleaned up
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
    //like above code it gets all the qata by match and displays it, out of order as of right now, problem with formatting in db
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
    
    }else{ //just displays that the data is not available
      document.getElementById("miscData").innerHTML = "NO MISC AVAILABLE YET";
    document.getElementById("graphContainer").innerHTML = "NO GRAPH AVAILABLE YET";
    document.getElementById("dataContainer").innerHTML = "NO DATA AVAILABLE YET";
    document.getElementById("qataContainer").innerHTML = "NO QATA AVAILABLE YET";
    }

    //dispalys image, if robot does not exist under it say data unavailable
    if(imglist.includes(team)){
      var imgData = robot_imgData[team]
      var imgamount = Object.keys(imgData)
      if (imgamount.length != 0) {
        let link = imgData[imgamount[0]]["Image of Robot"]
        let container = document.getElementById("imgContainer");
        let image = document.createElement("img");
        image.style.width="auto";
        image.style.maxWidth="100%";
        image.style.height="auto";
        image.style.maxHeight="100%";
        //image.style.height="100%";
        image.src = link
        container.appendChild(image)
      }
    }else{
      document.getElementById("imgContainer").innerHTML = "NO IMAGE AVAILABLE YET";
    }
    //Pitscout data, want to make it so it displays all pitscouted data but lack of time could not do it
    // also displays no data if the robot does not exist
    if(pitlist.includes(team)){
      var pitData = robot_pitData[team]
      let pits_container = document.getElementById("pitsData"); //change later to array, not object. really fucking scrappy code v2
      var pitstuff = ["Robot Weight", "Drivetrain Motors", "Motor Type"]

      var pitDatatimes = Object.keys(pitData)
      //goes through all the pitscouted data to get all the info that is wanted, will stop once the first instance of all wanted are provided
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
    //displays the data if got, else shows up as NA
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
  //detects when ever a robot is searched for
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


//compare tab
// create input box
var searchState = true;

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
// }
// split screen into 2-3 divs
// load in stab
// load in qata
// have match specifier


  //
  //HOME TAB AND RANK TAB
  //

  //table head names for the home tab
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
  //table head names for the rank tab
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
  //tracks the color for the data for home tab, also used in static_tracker, i think?, bad code too ngl
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

  //HOME TAB
  //picks up the match, both new or changed match, does not update if the data is deleted from the db, have to refresh
  vr(sr(db, 'Events/BB2022/Matches/'), (snapshot)=>{
    const data = snapshot.val()
    
        //if the match data is of a new match, meaning that if it is match 3 and has not other data
        //set up six place holder rows for that match of b1,b2,b3,r1,r2,r3
        //also create a place holder in the static_tracker (bad name)
        //this allows it to be replaced easily by incoming data
        //however, if the match data jumps it will not show up in order, will have to refresh to put in back in order
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
        //replace the place holder data, or if data already exists in that slot, replace the previous data
        //this system allows for it to replace the data irt without having to reload
        //does this buy calling the reference(? not sure what is exactly called) in static tracker to the row
        //that wants to be replaced, creates a new row, then does .replaceChild to replace it, then changes the
        //row in static tracker to the new row
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
  //RANKING TAB
  //updates everytime a robot gets a new match
  //code runs over every robot due to trash firebase api and its ability to grab the data desired well
  //so everytime there is a new match, it kind of has to calculate everything again and have to redisplay all the data
  yr(sr(db, 'Events/BB2022/Robots/'), (snapshot)=>{
    const over = snapshot.val()
    var objNames = Object.keys(over)
    var sort_arr = [];
    //for loop over each robot
    for(var r=0;r<objNames.length;r++){
    var data = over[objNames[r]];
    var keyNames = Object.keys(data)
    var total_value = 0;
    var avg_temp={}
    //for loop over all data points wanted to be avg 
    for(var i=0; i<val_tracker.length;i++){
      var temp_value = 0
      //adds up all match data for that data point wanted to be avged
      for(var j=0; j<keyNames.length; j++){
        //transforms climb level to points
        //adds value to temp val, which is the value that will later be avged
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
      //takes the the avg and rounds it to the tenth, then multiply by weight then equalizer, later want to make weight easily changeable
      //stores this avg int avg_tracker in table_cache
      temp_value/= keyNames.length
      temp_value = temp_value.toFixed(1)
      avg_temp[val_tracker[i]] = temp_value
      temp_value*= weights[weight_tracker[i]]
      temp_value*= equalizer[equalizer_tracker[i]]
      temp_value = temp_value.toFixed(1)
      total_value+=parseFloat(temp_value)
    }
    //puts the total avg to the robot, and vice versa
    total_value = total_value.toFixed(1)
    robot_avg_tracker[data[keyNames[0]]["ZTeam"]] = avg_temp

    robot_score_tracker[data[keyNames[0]]["ZTeam"]] = total_value

    }
    //sorts all the avgs
    var robot_score_key = Object.keys(robot_score_tracker)
    for(var d=0;d<robot_score_key.length;d++){
      if(sort_arr.indexOf(robot_score_tracker[robot_score_key[d]]) == -1){
        sort_arr.push(robot_score_tracker[robot_score_key[d]])
      }
    }
    sort_arr.sort(function(a,b){return a-b})
    var rank_counter = 1;
    //has to reset everytime, see above for reason why (firebase api)
    ranktblBody.innerHTML = ""
    //goes through all the avg, the by each avg, from greatest to least, checks all robots that have that avg then displays it in the table
    for(var g=sort_arr.length-1;g>=0;g--){
      for(var f=0; f<robot_score_key.length;f++){
        if(robot_score_tracker[robot_score_key[f]] == sort_arr[g]){
          //bad code
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
          //adds avg data to the row, then is displayed on the table
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

  