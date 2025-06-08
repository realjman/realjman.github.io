function getaf(x) { return x < 10 ? "0"+x : x }
function isPM(x) { return x > 11 ? true : false }

function update() {
  let uH12

  let d = new Date()

  let [uH,uM,uS] = [d.getHours(),d.getMinutes(),d.getSeconds()]

  ispm = isPM(uH)
  {ispm ? (uH12 = uH - 12) : uH12 = uH}
  {ispm ? (pm = 'PM') : pm = 'AM'}

  $("#time").html(`${d.toLocaleDateString()} ${uH}:${getaf(uM)}:${getaf(uS)} / ${uH12}:${getaf(uM)}:${getaf(uS)} ${pm}`)
}

const daysInMonth = {
  0: 31, // Jan
  1: (new Date().getFullYear() % 4 == 0) ? 29 : 28,
  2: 31,
  3: 30,
  4: 31,
  5: 30,
  6: 31,
  7: 31,
  8: 30,
  9: 31,
  10: 30,
  11: 31, // Dec
}

function calculateDaysTillBirthday() { // broken 
  let dt = new Date();

  let daysNeeded = 0;

  let currentMonth = dt.getMonth();
  let currentDate = dt.getDay();

  let bdayPassed = (currentMonth > 7) ? true : (currentMonth >= 7) && (currentDate > 8) ? true : false;

  if (!bdayPassed) {
    for (let i = currentMonth; i < 7; i++) daysNeeded += daysInMonth[i];
    daysNeeded -= currentDate
    if (currentMonth >= 7) daysNeeded += 7 - currentDate
  } else {

  };

  return daysNeeded
}

function colored(text, color, tag='span') {
  return `<${tag} style="color: ${color}; text-shadow: 0px 0px 10px ${color}">${text}</${tag}>`
}