//home
var static_tracker = {}

//jahto
var robot_score_tracker = {}
var robot_avg_tracker = {}

var weights = {
    "taxi_Weights" :1,
    "ahigh_Weights" :1,
    "alow_Weights" :1,
    "amiss_Weights" :0,
    "thigh_Weights" :1,
    "tlow_Weights" :1,
    "tmiss_Weights" :0,
    "aclimb_Weights" :0,
    "pclimb_Weights" :1,
    "tclimb_Weights" :0,
    "def_Weights" :0,
    "pen_Weights" :0,
    "oof_Weights" :0
}
var weight_tracker = [
    "taxi_Weights",
    "ahigh_Weights",
    "alow_Weights",
    "amiss_Weights",
    "thigh_Weights",
    "tlow_Weights",
    "tmiss_Weights",
    "aclimb_Weights",
    "pclimb_Weights",
    "tclimb_Weights",
    "def_Weights",
    "pen_Weights",
    "oof_Weights" 
]
var equalizer = {
    "taxi_Equalizer" :3,
    "ahigh_Equalizer" :4,
    "alow_Equalizer" :2,
    "amiss_Equalizer" :0,
    "thigh_Equalizer" :2,
    "tlow_Equalizer" :1,
    "tmiss_Equalizer" :0,
    "aclimb_Equalizer" :0,
    "pclimb_Equalizer" :1,
    "tclimb_Equalizer" :0,
    "def_Equalizer" :0,
    "pen_Equalizer" :0,
    "oof_Equalizer" :0
}
var equalizer_tracker = [
    "taxi_Equalizer",
    "ahigh_Equalizer",
    "alow_Equalizer",
    "amiss_Equalizer",
    "thigh_Equalizer",
    "tlow_Equalizer",
    "tmiss_Equalizer",
    "aclimb_Equalizer",
    "pclimb_Equalizer",
    "tclimb_Equalizer",
    "def_Equalizer",
    "pen_Equalizer",
    "oof_Equalizer"
]
var val_tracker = [
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
]

var pitscout_tracker = [
    "Timestamp",
    "Team Number",
    "Pitscout Name",
    "Drivetrain Type",
    "Robot Weight",
    "Number of Motors FOR DRIVETRAIN",
    "Motor Type",
    "Vision Capabilities",
    "Auto Capabilities",
    "Endgame Capabilities",
    "Aluminum Assistance",
    "Miscellaneous"
];
