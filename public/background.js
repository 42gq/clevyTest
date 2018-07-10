var c = document.createElement("canvas"),
$ = c.getContext("2d"),
w = (c.width = innerWidth),
h = (c.height = innerHeight),
lines = [],
lineCount = 10;
idleBackground = undefined;
var width = 1;
document.body.appendChild(c).style.display = "block";

function init() {
	for (var i = 0; i < lineCount; i++) lines.push(new Line());
	stage();
	idleBackground = setInterval(draw, 60);
	// loop();
}

function update(nb) {
	if (nb == 0) {
		clearInterval(idleBackground);
		width = 5;
		idleBackground = setInterval(draw, 60);
		setTimeout(function () {width = 1}, 1000);
		return;
	} else if (nb < 0) {
		for (var i = nb; i < 0; i++) if (lines.length > 0) lines.pop();
		return;
	}
	clearInterval(idleBackground);
	for (var i = lineCount; i < lineCount + nb; i++) lines.push(new Line());
	idleBackground = setInterval(draw, 60);
	lineCount += nb;
}

function stage() {
	w = c.width = innerWidth;
	h = c.height = innerHeight;
	$.fillStyle = "rgba(25, 25, 25, 1)";
	$.fillRect(0, 0, w, h);
}

function Line() {
	this.location = {
		x: Math.random() * w,
		y: Math.random() * h
	};
	console.log(width);
	this.color = "hsla(" + ~~(200 + Math.random() * 30) + ", 100%, 75%, 0.90)";
}

function draw() {
	$.fillStyle = "rgba(0, 0, 0, 0.025)";
	$.fillRect(0, 0, w, h);
	for (var i = 0; i < lines.length; i++) {
		lines[i].width = Math.random() + width + 0.25;
		var l = lines[i],
		a = ~~(Math.random() * 4) * 90,
		lL = Math.random() * 15 + 5;
		$.lineWidth = l.width;
		$.strokeStyle = l.color;
		$.beginPath();
		$.moveTo(l.location.x, l.location.y);
		switch (a) {
		case 0:
			l.location.y -= lL;
			break;
		case 90:
			l.location.x += lL;
			break;
		case 180:
			l.location.y += lL;
			break;
		case 270:
			l.location.x -= lL;
			break;
		default:
			break;
		}
		$.lineTo(l.location.x, l.location.y);
		if (l.location.x < 0 || l.location.x > w) l.location.x = Math.random() * w;
		if (l.location.y < 0 || l.location.y > h) l.location.y = Math.random() * h;
		$.stroke();
	}
}

function loop() {
	draw();
	requestAnimationFrame(loop);
}

window.addEventListener("resize", stage);

init();
