function getaf(x) { return x < 10 ? "0"+x : x }
function isPM(x) { return x > 11 ? true : false }

function colored(text, color, tag='span') {
  return `<${tag} style="color: ${color}; text-shadow: 0px 0px 10px ${color}">${text}</${tag}>`
}

function update() {
  let uH12

  let d = new Date()

  let [uH,uM,uS] = [d.getHours(),d.getMinutes(),d.getSeconds()]

  ispm = isPM(uH)
  {ispm ? (uH12 = uH - 12) : uH12 = uH}
  {ispm ? (pm = 'PM') : pm = 'AM'}

  $("#time").html(`${d.toLocaleDateString()} ${uH}:${getaf(uM)}:${getaf(uS)} / ${uH12}:${getaf(uM)}:${getaf(uS)} ${pm}`)
}