class dataStructure {
//                0         1         2           3         4          5            6           7              8            9           10             11                 12              13            14              15         16          17        18       
    dataValues = [0       , 0       , ""        , ""      , false    , 0          , 0         , 0            , 0          , 0         , 0            , false            , 0             , 0           , 0             , false    , 0         , ""      , ""];
    dataLabels = ["Match" , "Team"  , "Position", "Scout" , "Taxi"   , "Auto High", "Auto Low", "Auto Missed", "Tele High", "Tele Low", "Tele Missed", "Attempted Climb", "Climb Points", "Climb Time", "Defense Time", "Penalty", "Oof Time", "Yeet"  , "QATA"];
    dataTypes  = ["number", "number", "string"  , "string", "boolean", "number"   , "number"  , "number"     , "number"   , "number"  , "number"     , "boolean"        , "number"      , "number"    , "number"      , "boolean", "number"  , "string", "string"];
    avgFilterLabels=[
        "Taxi",
        "Auto High",
        "Auto Low",
        "Auto Missed",
        "Tele High",
        "Tele Low",
        "Tele Missed",
        "Attempted Climb",
        "Climb Points",
        "Climb Time",
        "Defence Time",
        "Penalty",
        "Oof Time"
    ]
    ptValues = [3, 4, 2, 0, 2, 1, 0, 0, 1, 0, 0, 0, 0]

    firebasePath = "Events/BB2022";
    firebaseConfig = {
        apiKey: "AIzaSyAO1aIe_fTZB6duj8YIRyYcLTINlcP196w",
        authDomain: "escouting-7b4e0.firebaseapp.com",
        databaseURL: "https://escouting-7b4e0-default-rtdb.firebaseio.com",
        projectId: "escouting-7b4e0",
        storageBucket: "escouting-7b4e0.appspot.com",
        messagingSenderId: "377179821867",
        appId: "1:377179821867:web:cedab35ab708c12986976e",
        measurementId: "G-8VWYRF9QY6"
    };

    pitscoutLabels = ["Timestamp", "Team Number", "Pitscout Name", "Drivetrain Type", "Robot Weight", "Number of DT Motors", "Motor Type", "Vision", "Auto", "Endgame", "Aluminum Assistance", "Miscellaneous"];

    constructor() {}

    getDataValues() {
        return this.dataValues;
    }
    getDataValue(i) {
        return this.dataValues[i];
    }
    getDataLabels() {
        return this.dataLabels;
    }
    getDataLabel(i) {
        return this.dataLabels[i];
    }
    getDataTypes() {
        return this.dataTypes;
    }
    getDataType(i) {
        return this.dataTypes[i];
    }
    getPitscoutLabels() {
        return this.pitscoutLabels;
    }
    getPitscoutLabel(i) {
        return this.pitscoutLabels[i];
    }
    getPath(type) {
        return firebasePath + type;
    }

    setDataValues(arr) {
        this.dataValues = arr;
    }
    setDataValues(i, val) {
        this.dataValues[i] = val;
    }

    validateValues() {

    }

}