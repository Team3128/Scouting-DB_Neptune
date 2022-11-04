const settings = {
    "main": {
        "skipColumnOfData": true,
        "skipColumnNumberList": [13, 17, 18, 19, 20, 21]
    }
}
let currentTab = "table"

function openTab(tabName) {
    console.log("Opening: " + tabName)
    var i, tabcontent;
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
       tabcontent[i].style.display = "none";
    }
    document.getElementById(tabName+"-container").style.display = "block";
    currentTab = tabName;
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