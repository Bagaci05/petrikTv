function startTimer() {
    const todaya = new Date();
    let h = todaya.getHours();
    let m = todaya.getMinutes();
    let s = todaya.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML =  h + ":" + m + ":" + s;
    setTimeout(startTimer, 1000);
  }
  
  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function lessonhighlight(){
  window.setInterval(function(){
    timecheck();
}, 5000);
}
// fasz
var colored = "#72c3b6";
var uncoloreddark ="#0f0f0f45"; 
var uncoloredlight ="#ffffff3a";
function timecheck(){
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth();
  var day = today.getDate();
  if(new Date(year,month,day,8,45)>= today) {
    document.getElementById("1ora").style.backgroundColor =colored;
  }else{
    if(new Date(year,month,day,8,45)<today&&today<=new Date(year,month,day,9,40)){
      document.getElementById("2ora").style.backgroundColor =colored;
    }else{
      if (new Date(year,month,day,9,40)<today&&today<=new Date(year,month,day,10,35)){
        document.getElementById("3ora").style.backgroundColor =colored;
      }else{
        if(new Date(year,month,day,10,35)<today&&today<= new Date(year,month,day,11,30)){
          document.getElementById("4ora").style.backgroundColor =colored;
        }else{
          if(new Date(year,month,day,11,30)<today&&today<= new Date(year,month,day,12,25)){
            document.getElementById("5ora").style.backgroundColor =colored;
          }else{
            if(new Date(year,month,day,12,25)<today&&today<= new Date(year,month,day,13,20)){
              document.getElementById("6ora").style.backgroundColor =colored;
            }else{
              if(new Date(year,month,day,13,20)<today&&today<= new Date(year,month,day,14,25)){
                document.getElementById("7ora").style.backgroundColor =colored;
              }else{
                if(new Date(year,month,day,14,25)<today&&today<= new Date(year,month,day,15,15)){
                  document.getElementById("8ora").style.backgroundColor =colored;
                }else{
                  document.getElementById("8ora").style.backgroundColor =uncoloreddark;
                }
                document.getElementById("7ora").style.backgroundColor =uncoloredlight;
              }
              document.getElementById("6ora").style.backgroundColor =uncoloreddark;
            }
            document.getElementById("5ora").style.backgroundColor =uncoloredlight;
          }
          document.getElementById("4ora").style.backgroundColor =uncoloreddark;
        }
        document.getElementById("3ora").style.backgroundColor =uncoloredlight;
      }
      document.getElementById("2ora").style.backgroundColor =uncoloreddark;
    }
    document.getElementById("1ora").style.backgroundColor =uncoloredlight;
  }
}
function yearmonthday(){
var tod = new Date();
let todmonth = tod.getMonth()+1;
let todday = tod.getDate();
if(todmonth <10){
  todmonth = "0"+todmonth.toString()
}
if(todday <10){
  todday = "0"+todday.toString()
}
var res = tod.getFullYear()+"." + todmonth +"."+todday;
document.getElementById("date").innerHTML = res;}
