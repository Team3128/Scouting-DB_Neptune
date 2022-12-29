export class SwitchPage {
    constructor(){
        this.currentState = "home"
        this.hidePanelClass = "";
        this.showPanelClass = "";   
        this.elem = document.getElementById("nav");
        this.navBar = document.getElementById("nav-bar");
        this.navSearch = document.getElementById("nav-search");
        this.toggleState = true;
    }
    hidePanel(){
        this.navBar.classList.add("hideNavBar")
        this.navSearch.classList.add("hideNavSearch")

        setTimeout(() => {
            this.elem.style = "display: none";
            this.navBar.classList.remove("hideNavBar")
            this.navSearch.classList.remove("hideNavSearch")
        }, 300);
    }
    showPanel(){
        this.navBar.classList.add("showNavBar")
        this.navSearch.classList.add("showNavSearch")
        this.elem.style = "display: grid";

        setTimeout(() => {
            this.navBar.classList.remove("showNavBar")
            this.navSearch.classList.remove("showNavSearch")
        }, 300);
    }
    switchEvent(index){
        try{
            document.getElementById(this.currentState).classList.add("hide");
            document.getElementById(index).classList.remove("hide");
            this.currentState = index;
            this.hidePanel()
            this.toggleState = false;
        }
        catch(err){
            alert("Err switching page: Page id or page name does not exist")
        }
    }
}