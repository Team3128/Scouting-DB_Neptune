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

