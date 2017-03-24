

//LIQUOR PAGE

//file.write with javascript

var d = new Date();
var n = d.getDay()-1;
var day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var dayRate = {Monday:0.8, Tuesday:0.8, Wednesday:0.85,
  Thursday:0.9, Friday:1.2, Saturday:1.2, Sunday:0.8};
var dayMultiplier = dayRate[day[n]];
var eventTime = 0;
var volcanoTime = [1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 0.5, 0.5, 0.6, 0.7, 1.0, 1.2,
    1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 1.3, 1.4, 1.5, 1.6, 1.7, 1.6];
var budTime = [1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 0.5, 0.5, 0.6, 0.7, 1.0, 1.2,
    1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 1.3, 1.4, 1.5, 1.6, 1.7, 1.6];
var heinekenTime = [1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 0.5, 0.5, 0.6, 0.7, 1.0, 1.2,
    1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 1.3, 1.4, 1.5, 1.6, 1.7, 1.6];
var michelobTime = [1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 0.5, 0.5, 0.6, 0.7, 1.0, 1.2,
    1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 1.3, 1.4, 1.5, 1.6, 1.7, 1.6];
var volcanoBasePrice = 5;
var budBasePrice = 3;
var heinekenBasePrice = 4.5;
var michelobBasePrice = 4;
var today, h, m, s;
var dayMultiplier;
var secondsInHour, nextHour;
var volcanoPrice, budPrice, heinekenPrice, michelobPrice;
var volcanoChange, budChange, heinekenChange, michelobChange;
var currentvolcano, currentBud, currentHeineken, currentMichelob;
var volcanoMultiplier, budMultiplier, heinekenMultiplier, michelobMultiplier;
var purchasePrice, finalPrice;
var itemQuantity = 1;
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

function volcanoFunction() {
  setTime();
  volcanoChange = secondsInHour*(volcanoTime[h]-volcanoTime[nextHour])/3600;
  currentvolcano = volcanoTime[h]- volcanoChange;
  volcanoMultiplier = dayMultiplier*currentvolcano;
  volcanoPrice = volcanoMultiplier*volcanoBasePrice + eventTime;
  document.getElementById('volcano').innerHTML = "Fiery Volcano :  $" + volcanoPrice.toFixed(3);
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
  volcanoFunction();
  budFunction();
  heinekenFunction();
  michelobFunction();
};

setInterval (autoUpdate, 1000);

$("#menulist li").click(function() {
  $("#menulist ul").children().removeClass("itemselected");
  $("#menulist ul").children().css("border-bottom", "1px solid grey");
  $(this).parent().removeClass("invisible").addClass("itemselected");
  $(this).parent().prev().css("border-bottom", "none");
});

$(".orderbutton").on("click", function(){
  s1 = $(this).prev().text();
  s2 = s1.substring(s1.lastIndexOf('$') + 1);
  s3 = s1.substring(0, s1.indexOf(":"));
  purchasePrice = parseFloat(s2);
  $("#menulist").addClass("hidden");
  $("#purchaseOrder").removeClass("hidden");
  document.getElementById('selectedItem').innerHTML = s3;
  document.getElementById("quantity").innerHTML=itemQuantity;
  document.getElementById('selectedPrice').innerHTML = "Price: $" + purchasePrice.toFixed(2);
  document.getElementById('selectedTax').innerHTML = "Tax: $"+ (0.06*purchasePrice).toFixed(2);
  document.getElementById('selectedTotal').innerHTML = "Total: $"+ (1.06*purchasePrice).toFixed(2);
});
$("#quantitydown").on("click", function(){
    if (itemQuantity>=2) {itemQuantity-=1;};
    document.getElementById("quantity").innerHTML=itemQuantity;
    purchasePrice=parseFloat(s2)*itemQuantity;
    document.getElementById('selectedPrice').innerHTML = "Price: $" + purchasePrice.toFixed(2);
    document.getElementById('selectedTax').innerHTML = "Tax: $"+ (0.06*purchasePrice).toFixed(2);
    document.getElementById('selectedTotal').innerHTML = "Total: $"+ (1.06*purchasePrice).toFixed(2);
});
$("#quantityup").on("click", function(){
    itemQuantity+=1;
    document.getElementById("quantity").innerHTML=itemQuantity;
    purchasePrice=parseFloat(s2)*itemQuantity;
    document.getElementById('selectedPrice').innerHTML = "Price: $" + purchasePrice.toFixed(2);
    document.getElementById('selectedTax').innerHTML = "Tax: $"+ (0.06*purchasePrice).toFixed(2);
    document.getElementById('selectedTotal').innerHTML = "Total: $"+ (1.06*purchasePrice).toFixed(2);
});
$(".confirmOrder").on("click", function(){
    finalPrice = purchasePrice*1.06;
    currentTab += finalPrice;
    alert("You ordered " + itemQuantity + " " + s3 + "for $" + finalPrice.toFixed(2) + ".  Your order will be ready soon!");
    document.getElementById('bartab').innerHTML = "Current Tab :  $" + currentTab.toFixed(2);
    $("#purchaseOrder").addClass("hidden");
    $("#menulist").removeClass("hidden");
    itemQuantity=1;
    $("#menulist li").parents().removeClass("itemselected");
    $("#menulist ul").children().css("border-bottom", "1px solid grey");
});
$(".cancelOrder").on("click", function(){
    $("#purchaseOrder").addClass("hidden");
    $("#menulist").removeClass("hidden");
    itemQuantity=1;
});

//localStorage.setItem("lastname", "smith");

//  THIS IS WHERE WE KEEP TRACK OF THE
//  BAR TAB
document.getElementById('bartab').innerHTML = "Current Tab :  $" + currentTab;
