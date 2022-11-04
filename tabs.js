// var tags = document.getElementsByClassName("nav");
// for (var i=0; i<tags.length; i++){
//   tags[i].addEventListener("mousedown", function(e){
//     let tabName = this.id
//     console.log("Opening: " + tabName)
//     var i, tabcontent;

//     // Get all elements with class="tabcontent" and hide them
//     tabcontent = document.getElementsByClassName("tabcontent");
//     for (i = 0; i < tabcontent.length; i++) {
//       tabcontent[i].style.display = "none";
//     }
//     var functionName = tabName + "_tableHead";
//     console.log(functionName)
//     window[functionName]();
//     document.getElementById(tabName).style.display = "block";
//   });
// }

function openTab(tabName) {
    console.log("Opening: " + tabName)
    var i, tabcontent;
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
       tabcontent[i].style.display = "none";
    }
    document.getElementById(tabName+"-container").style.display = "block";
}