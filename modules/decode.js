export class DataConverter {
    data;
    method;
    i;

    constructor(data, method){
        this.data = data;
        this.method = method;
        this.integrity = true;
        this.exclude = [];
    }
    
    verifyInputIntegrity(i){
        //if fails, stop
        //if passes, keep on going
        console.log(i)
    }
    verifyOutputIntegrity(){
        // file integrity later
        //object to table: make sure every array has 21 values, make sure every value is of correct type. 
    }
    Create2DArrayFromObject(){
        //Converts to 2-dimensional array which is easy to read for main table
        if(this.method == "object_to_table"){
            let game_arr = Object.values(this.data)
            console.log(game_arr)
            this.data = [];
            this.data[0] = settings.main_display;
            for(let i=0; i<game_arr.length; i++){
                let match_arr = []
                for(let j=0; j<settings.main_display.length; j++){
                    match_arr.push(game_arr[i][settings.main_display[j]])   
                }
                this.data.push(match_arr);
            }
        }
        return this.data;
    }
}