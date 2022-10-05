//hf figuring how this code works, ambitious future dev :) 
async function getapi(e) { let l = "https://www.thebluealliance.com/api/v3/event/" + e + "/matches?X-TBA-Auth-Key=IDfrcwNnw87od77An1oZ4TlPYYEjyZloF98XRZx5jE7FsRKMnr06rnOBYX2KUKIO"; const t = await fetch(l); var a = await t.json(), n = [], r = []; for (let e = 0; e < a.length; e++)a[e].key.includes("qm") && n.push(a[e]); a = []; for (let e = 0; e < n.length; e++) { a[n[e].match_number - 1] = n[e] } for (let e = 0; e < a.length; e++) { let l = a[e].alliances.blue.team_keys, t = a[e].alliances.red.team_keys; for (j = 0; j < 3; j++)l[j] = l[j].replaceAll("frc", ""), r.push(l[j]); for (j = 0; j < 3; j++)t[j] = t[j].replaceAll("frc", ""), r.push(t[j]) } return new Promise(((e, l) => { e(r) })) }

//how to call (e.g. CA San Diego Regional 2022)

//getapi("2022casd").then((data) => {
//    console.log(data)
//})