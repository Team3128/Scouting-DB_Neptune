// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";
// import { getDatabase, ref, onValue, get, set } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js"
// const firebaseConfig = {
//     apiKey: "AIzaSyAO1aIe_fTZB6duj8YIRyYcLTINlcP196w",
//     authDomain: "escouting-7b4e0.firebaseapp.com",
//     databaseURL: "https://escouting-7b4e0-default-rtdb.firebaseio.com",
//     projectId: "escouting-7b4e0",
//     storageBucket: "escouting-7b4e0.appspot.com",
//     messagingSenderId: "377179821867",
//     appId: "1:377179821867:web:cedab35ab708c12986976e",
//     measurementId: "G-8VWYRF9QY6"
// };
  
//   const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);
//   const database = getDatabase(app);

getapi("2022caph").then((data) => {
  console.log(data)
})

//   console.log("success")
        
//   const db = getDatabase();

//   function getDataOnce(){
//     return new Promise((resolve, reject)=>{
//       try{    
//         get(ref(db, "Events/CAPH22/matches")).then((snapshot) => {
    
//           let data = Object.values(snapshot.val());

//           console.log(data)
//           for(let i=0; i<data.length;i++){
            
//           }

//           let obj = data[0].blue[0];
//           obj = Object.getOwnPropertyNames(obj);
//           obj.unshift("Team", "Match")
//           resolve([data, obj]);



//         })
//       }
//       catch(error){
//         console.log(error);
//         alert(error);
//         reject();
//       }
//     }
//   )
// }
//   onValue(ref(db, 'Events/CAPH22/matches'), (snapshot)=>{
//     const data = snapshot.val()
//     console.log(data)
    
//   })

//   function generateMainTable(){
//     getDataOnce().then((returnArr) =>{
//       let objKeys = returnArr[1]
//       let dataValues = Object.values(returnArr[0]);
//       const tbl = document.createElement("table");
//       const tblBody = document.createElement("tbody");
//       const thead = document.createElement("thead")
//       tbl.appendChild(thead)
//       const headRow = document.createElement("tr")
//       thead.appendChild(headRow)

//       //creating table head with keys
//       for(let b=0; b<objKeys.length;b++){
//         const headCell = document.createElement("th");
//         headRow.appendChild(headCell);
//         headCell.classList.add("headCell")
//         headCell.innerHTML = objKeys[b]
//       }
      
//       // creating all cells
//       for (let i = 0; i < dataValues.length ; i++) {
        
//         // creates a table row
//         const row = document.createElement("tr");
    
//         for (let j = 0; j < objKeys.length; j++) {

//           const cell = document.createElement("td");
//           const cellText = document.createTextNode(`cell in row ${i}, column ${j}`);
//           cell.appendChild(cellText);
//           row.appendChild(cell);
//         }
    
//         // add the row to the end of the table body
//         tblBody.appendChild(row);
//       }
    
//       // put the <tbody> in the <table>
//       tbl.appendChild(tblBody);
//       // appends <table> into <body>
//       document.body.appendChild(tbl);
     
//     } ).catch((error) =>{
//       alert(error)
//       return;
//     })
//   }
  
  
// generateMainTable()