let datum = new Date();
let year = datum.getFullYear();
let mounth =datum.getMonth()+1;
let day =datum.getDate();
if(day<10){
    daytrue = "0" + day.toString();
}else{
    daytrue = day.toString();
}
const fulldate = year.toString() + mounth.toString() + daytrue;
const api_url = "https://futar.bkk.hu/api/query/v1/ws/otp/api/where/schedule-for-stop.json?key=apaiary-test&version=3&appVersion=appVersion&includeReferences=true&stopId=BKK_F01145&onlyDepartures=false";//&date="+fulldate;
const api_url2="https://futar.bkk.hu/api/query/v1/ws/otp/api/where/schedule-for-stop.json?key=apaiary-test&version=3&appVersion=appVersion&includeReferences=true&stopId=BKK_F01146&onlyDepartures=false";//&date="+fulldate;

window.setInterval(function(){
    loaddate();
    secondtable()
  }, 5000);
var fulljson;
var fulljson2;
function loaddate(){
    fetch(api_url,{
        method : "GET",
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-type": "application/json"
        }
    })
    .then(res => {
        if(res.ok){
            return res.json();
            //console.log("Refreshed");
        }else{console.log("(re)Connection Error")
              return "error"}
    })
    .then(data => {     
        fulljson = data
        //console.log(fulljson);
    })
    .catch(error => console.log("Error :(")).then(v =>{
        var ot={minute:szamlalo(2,fulljson),id:"5"};
        var het={minute:szamlalo(4,fulljson),id:"7"};
        var szaztiz={minute:szamlalo(0,fulljson),id:"110"};
        var szaztizketto={minute:szamlalo(1,fulljson),id:"112"};
        var szaztizenharom={minute:szamlalo(6,fulljson),id:"133"};
        let jaratok = [ot, het, szaztiz, szaztizketto,szaztizenharom]
        jaratok.sort((a,b) => (a.minute > b.minute) ? 1 : ((b.minute > a.minute) ? -1 : 0));
        return jaratok;
    }).then(data =>{
        for(i=0; i<data.length;i++){
            if (data[i].minute ==0){
                data[i].minute = "most";
            }else{
                if(data[i].minute == 1500){
                    data[i].minute = ">15p";
                }else{  
                    data[i].minute = data[i].minute+"p";
                }
            } 
        }
        return data;
    }).then(data=>{
        var ia = 0;
        for(i=0; i<data.length;i++){
            var activejarat =ia+1+"1jarat";
            var activeido =ia+1+"1ido";
            document.getElementById(activejarat).innerHTML =data[ia].id;
            document.getElementById(activeido).innerHTML = data[ia].minute;
            ia++;
        }
    });
}

function szamlalo (jarat,json){
    const dc ="0";
    const listlenght =json.data.entry.schedules[jarat].directions[dc].stopTimes.length;
    var min;
    var most= datum.getTime();
    for (let index = 0; index < listlenght; index++) {   
       var active1 = json.data.entry.schedules[jarat].directions[dc].stopTimes[index].predictedArrivalTime;
       var active = active1*1000;
        if(active-most >=  0){
            if(active<min){
                min=active;
            }else{
                if(!min){
                    min=active;
                }
            }
        }
    }
    var mindate = new Date(min);
    if(mindate.getMinutes()-datum.getMinutes()<1 || isNaN(min)){
        return 1500
    }else{
    return mindate.getMinutes()-datum.getMinutes();
    }
}

var dailyweater;
function farenheittocesoius(fheit){
    ret = (fheit-32)*0.5556;
    ret = Math.round((ret + Number.EPSILON) * 100) /100;
    return ret;
}
function nowtemp(){
    fetch("https://community-open-weather-map.p.rapidapi.com/weather?q=Zugló&lang=null&units=imperial&mode=JSON", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": ""
        }
    })
    .then(response => {
        return response.json()
    })
    .then(data =>{
        var now = data.main.temp;
        document.getElementById("tpnow").innerHTML = "Hőmérséklet: "+farenheittocesoius(now)+"℃";
    });
    setInterval(nowtemp(),1200000);
} 

function secondtable(){
    fetch(api_url2,{
        method : "GET",
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-type": "application/json"
        }
    })
    .then(res => {
        if(res.ok){
            //console.log("Refreshed2");
        }else{console.log("(re)Connection Error2")}
       return res.json();
    })
    .then(data => {
        fulljson2 = data;
        //console.log(fulljson2);
    })
    .then(v =>{
        var ot2={minute:szamlalo(3,fulljson2),id:"5"};
        var het2={minute:szamlalo(6,fulljson2),id:"7"};
        var szaztiz2={minute:szamlalo(1,fulljson2),id:"110"};
        var szaztizketto2={minute:szamlalo(2,fulljson2),id:"112"};
        var szaztizenharom2={minute:szamlalo(10,fulljson2),id:"133E"};
        var kettoharminc ={minute:szamlalo(0,fulljson2),id:"230"};
        var harminca = {minute:szamlalo(8,fulljson2),id:"30A"};
        let jaratok2 = [ot2, het2, szaztiz2, szaztizenharom2, szaztizketto2, kettoharminc, harminca];
        jaratok2.sort((a,b) => (a.minute > b.minute) ? 1 : ((b.minute > a.minute) ? -1 : 0));
        return jaratok2;
    }).then(data=>{
        for(i=0; i<data.length;i++){
            if (data[i].minute ==0){
                data[i].minute = "most";
            }else{
                if(data[i].minute == 1500){
                    data[i].minute = ">15p";
                }else{  
                    data[i].minute = data[i].minute+"p";
                }
            } 
        }
        return data;
    }).then(data =>{
        var ik = 0;
        for(i=0; i<data.length;i++){
            var activejarat =ik+1+"jarat";
            var activeido =ik+1+"ido";
            document.getElementById(activejarat).innerHTML =data[ik].id;
            document.getElementById(activeido).innerHTML = data[ik].minute;
            ik++;
        }
    }).catch(error => {
        console.log(error);
    });
}