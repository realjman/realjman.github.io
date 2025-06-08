var tmp = {
  time: 0
};
var diff = 0;
var date = Date.now()

function calc(deltaTime) {
  tmp.time += deltaTime
}

function loop() {
  diff = Date.now() - date;
  update();
  updateHTML();
  calc(diff/1000);
  date = Date.now();
}


function loadApp() {
  setupHTML()
  updateGamesHTML()


  setInterval(loop, 1000/60)
}

function setupHTML() {
	setupGamesHTML()
	for (let x in el.setup) el.setup[x]()
	
    tmp.el = {}
	let all = document.getElementsByTagName("*")
	for (let i=0;i<all.length;i++) {
		let x = all[i]
		tmp.el[x.id] = new Element(x)
	}
}

function updateHTML() {
  updateGamesHTML()
  for (let x in el.update) el.update[x]()
}