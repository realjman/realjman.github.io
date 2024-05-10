function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "flex";
  evt.currentTarget.className += " active";
}

function selectTab(tab, name) {
  var i, tabs, buttons

  tabs = document.getElementsByClassName('content');
  for (i = 0; i < tabs.length; i++) {
    tabs[i].style.display = 'none'
  }

  buttons = document.getElementsByClassName('sidebutton')
  for (i = 0; i < buttons.length; i++) {
    buttons[i].className = buttons[i].className.replace(" active", "");
  }

  document.getElementById(name).style.display = 'flex';
  tab.currentTarget.className += " active";
}

function getaf(x) { return x < 10 ? "0"+x : x }
function isPM(x) { return x > 11 ? true : false }

function update() {
  let uH12

  let d = new Date()

  let tzOffsetHours = (d.getTimezoneOffset()/60)
  let [uH,uM,uS] = [d.getUTCHours()-tzOffsetHours,d.getMinutes(),d.getSeconds()]

  ispm = isPM(uH)
  {ispm ? (uH12 = uH - 12) : uH12 = uH}
  {ispm ? (pm = 'PM') : pm = 'AM'}

  $("#time").html("It's currently "+getaf(uH)+":"+getaf(uM)+":"+getaf(uS)+" / "+getaf(uH12)+":"+getaf(uM)+":"+getaf(uS)+" "+pm+" for me.")
  $("#test").html(tzOffsetHours)
}

setInterval(update, 1000/60)