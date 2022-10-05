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
  function getDataOnce(){
    return new Promise((resolve, reject)=>{
      try{    
        get(ref(db, "Events/CASD22/matches")).then((snapshot) => {
    
          let data = Object.values(snapshot.val());
          let obj = data[0].blue[0];
          obj = Object.getOwnPropertyNames(obj);
          obj.unshift("Match", "Team")
          let temp = []
          for(let i=0; i<data.length;i++){
            temp.push(Object.values(data[i]))
            
          }
          console.log(temp)
          data = []
          for(let i=0; i<temp.length; i++){
            for(let j=0; j<3; j++){
              data.push(temp[i][1][j])

            }
            for(let j=0; j<3; j++){
              data.push(temp[i][0][j])
            }
          }
          resolve([data, obj]);



        })
      }
      catch(error){
        console.log(error);
        alert(error);
        reject();
      }
    }
  )
}
  onValue(ref(db, 'Events/CASD22/matches'), (snapshot)=>{
    const data = snapshot.val()
    console.log(data)
    
  })

  function generateMainTable(){
    getDataOnce().then((returnArr) =>{
      let objKeys = returnArr[1]
      if(settings.main.skipColumnOfData){
        let list = settings.main.skipColumnNumberList
        let tempList = []
        for(let b=0; b<objKeys.length; b++){
          if(list.includes(b)){
            //do nothing
          }
          else{
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
      for(let b=0; b<objKeys.length;b++){
        const headCell = document.createElement("th");
        headRow.appendChild(headCell);
        headCell.classList.add("headCell")
        headCell.setAttribute("id", `head_cell_${b}`)
        headCell.innerHTML = objKeys[b]
      }
      // deleting data

      
      // creating all cells
      for (let i = 0; i < dataValues.length ; i++) {
        let temp = Object.values(dataValues[i])
        let temp2 = []
        // creates a table row
        const row = document.createElement("tr");
        if(i%2 == 0){
          row.classList.add("rowLight")
        }
        
        if(settings.main.skipColumnOfData){
          let list = settings.main.skipColumnNumberList;
          
          for(let j=0; j<list.length;j++){
            temp[list[j]-2] = 'REPLACE_VALUE'
          }
          for(let j=0; j<temp.length; j++){
            if(temp[j] != "REPLACE_VALUE"){
              temp2.push(temp[j]);
            }
          }
          temp = temp2;
        }

        for (let j = 0; j < objKeys.length; j++) {
          const cellText = document.createElement("div");
          const cell = document.createElement("td");
          if(j == 0){
            cellText.innerHTML = Math.floor(i/6) + 1
          }
          if(j == 1){
            getapi("2022casd").then((data) => {
              cellText.innerHTML = data[i];
            })
          }
          
          else if(j>1){
            if(j==17){
              cell.style.width = "150px";
            }
            cellText.innerHTML = temp[j-2]
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
     
    } ).catch((error) =>{
      alert(error)
      return;
    })
  }
  
  
generateMainTable()