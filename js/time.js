
/*function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
  // add a zero in front of numbers<10
m = checkTime(m);
s = checkTime(s);
document.getElementById('time').innerHTML = seconds;
t = setTimeout(function() {
  startTime()
  }, 500);
}*/

//BEER PAGE

var d = new Date();
var n = d.getDay()-1;
var day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var dayRate = {Monday:0.8, Tuesday:0.8, Wednesday:0.85,
  Thursday:0.9, Friday:1.2, Saturday:1.2, Sunday:0.8};
var dayMultiplier = dayRate[day[n]];
var eventTime = 3;
var stellaTime = [1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 0.5, 0.5, 0.6, 0.7, 1.0, 1.2,
    1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 1.3, 1.4, 1.5, 1.6, 1.7, 1.6];
var budTime = [1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 0.5, 0.5, 0.6, 0.7, 1.0, 1.2,
    1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 1.3, 1.4, 1.5, 1.6, 1.7, 1.6];
var heinekenTime = [1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 0.5, 0.5, 0.6, 0.7, 1.0, 1.2,
    1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 1.3, 1.4, 1.5, 1.6, 1.7, 1.6];
var michelobTime = [1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 0.5, 0.5, 0.6, 0.7, 1.0, 1.2,
    1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 1.3, 1.4, 1.5, 1.6, 1.7, 1.6];
var stellaBasePrice = 5;
var budBasePrice = 3;
var heinekenBasePrice = 4.5;
var michelobBasePrice = 4;
var today, h, m, s;
var dayMultiplier;
var secondsInHour, nextHour;
var stellaPrice, budPrice, heinekenPrice, michelobPrice;
var stellaChange, budChange, heinekenChange, michelobChange;
var currentStella, currentBud, currentHeineken, currentMichelob;
var stellaMultiplier, budMultiplier, heinekenMultiplier, michelobMultiplier;
var purchasePrice, finalPrice;
var s1 = "text";
var s2 = "price";
var s3 = "item";
var currentTab = 0;

function setTime () {
  today = new Date();
  h = today.getHours();
  m = today.getMinutes();
  s = today.getSeconds();
  secondsInHour = (m*60)+s;
  if (h===23) {nextHour=0} else {nextHour = h+1};
};

function stellaFunction() {
  setTime();
  stellaChange = secondsInHour*(stellaTime[h]-stellaTime[nextHour])/3600;
  currentStella = stellaTime[h]- stellaChange;
  stellaMultiplier = dayMultiplier*currentStella;
  stellaPrice = stellaMultiplier*stellaBasePrice + eventTime;
  document.getElementById('Stella').innerHTML = "Stella :  $" + stellaPrice.toFixed(3);
};

function budFunction() {
  setTime();
  budChange = secondsInHour*(budTime[h]-budTime[nextHour])/3600;
  currentBud = budTime[h]- budChange;
  budMultiplier = dayMultiplier*currentBud;
  budPrice = budMultiplier*budBasePrice + eventTime;
  document.getElementById('Budweiser').innerHTML = "Budweiser :  $" + budPrice.toFixed(3);
};

function heinekenFunction() {
  setTime();
  heinekenChange = secondsInHour*(heinekenTime[h]-heinekenTime[nextHour])/3600;
  currentHeineken = heinekenTime[h]- heinekenChange;
  heinekenMultiplier = dayMultiplier*currentHeineken;
  heinekenPrice = heinekenMultiplier*heinekenBasePrice + eventTime;
  document.getElementById('Heineken').innerHTML = "Heineken :  $" + heinekenPrice.toFixed(3);
};

function michelobFunction() {
  setTime();
  michelobChange = secondsInHour*(michelobTime[h]-michelobTime[nextHour])/3600;
  currentMichelob = michelobTime[h]- michelobChange;
  michelobMultiplier = dayMultiplier*currentMichelob;
  michelobPrice = michelobMultiplier*michelobBasePrice + eventTime;
  document.getElementById('Michelob').innerHTML = "Michelob :  $" + michelobPrice.toFixed(3);
};

function autoUpdate() {
  stellaFunction();
  budFunction();
  heinekenFunction();
  michelobFunction();
};

setInterval (autoUpdate, 500);

$("#beerlist li").click(function() {
  $(this).parent().siblings().css("border-bottom", "1px solid grey")
  $(this).parent().siblings().removeClass("itemselected");
  $(this).parent().removeClass("invisible").addClass("itemselected");
  $(this).parent().prev().css("border-bottom", "none")
});

$(".orderbutton").on("click", function(){
  s1 = $(this).prev().text();
  s2 = s1.substring(s1.lastIndexOf('$') + 1);
  s3 = s1.substring(0, s1.indexOf(":"));
  purchasePrice = parseFloat(s2);
  $("#beerlist").addClass("hidden");
  $("#purchaseOrder").removeClass("hidden");
  finalPrice = (1.06*purchasePrice);
  document.getElementById('selectedItem').innerHTML = s3;
  document.getElementById('selectedPrice').innerHTML = "Price: $" + purchasePrice.toFixed(2);
  document.getElementById('selectedTax').innerHTML = "Tax: $"+ (0.06*purchasePrice).toFixed(2);
  document.getElementById('selectedTotal').innerHTML = "Total: $"+ finalPrice.toFixed(2);
  $(".confirmOrder").on("click", function(){
    currentTab += finalPrice;
    //alert("You ordered " + s3 + "for $" + finalPrice + ".  Your order will be ready soon!");
    document.getElementById('bartab').innerHTML = "Current Tab :  $" + currentTab.toFixed(2);
  });
});

//localStorage.setItem("lastname", "smith");

//  THIS IS WHERE WE KEEP TRACK OF THE
//  BAR TAB
document.getElementById('bartab').innerHTML = "Current Tab :  $" + currentTab;
