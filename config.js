const settings = {
  //deprecated
    "main": {
        "skipColumnOfData": true,
        "skipColumnNumberList": [13, 17, 18, 19, 20, 21]
    }
}

var robotData = {}
var robotAvg = []
var robotMax = []
var robotMin = []


//UTILITY FUNCTIONS: Don't change for now

//calls firebase for everything on main table, deprecated
function getAllDataOnce(){
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

//strips data given array of what to get rid of
//data has to be object
function stripData(data, array){    
    if(Array.isArray(data)){
      let temp = [];
      for(let i=0; i<data.length; i++){
        if(array.includes(i)){
          //do nothing
        }
        else{
          temp.push(data[i])
        }
      }
      return(temp);
    }
    else if(typeof data == "object"){
      let keys = Object.keys(data);
      let vals = Object.values(data);

      let temp = [];
      for(let i=0; i<keys.length; i++){
          if(array.includes(i)){
              //nothing
          }
          else{
              temp.push(keys[i]);
          }
      }
      let temp2 = [];
      for(let i=0; i<vals.length; i++){
          if(array.includes(i)){
              //nothing
          }
          else{
              temp2.push(vals[i]);
          }
      }
      return([temp, temp2]);
    }
    else{
      alert("Not object @ function stripData");
      return;
    }
}