var csInterface = new CSInterface();
var appName = csInterface.hostEnvironment.appName;
var AEpanel_nav = "#161616";
var AEpanel_bg = "#232323";

loadJSX("json2.jsx");
loadJSX("index.jsx");
console.log(`Loading for ${appName}`);
window.onload = eatCookies();
window.onload = scanningToggle("On");
window.onload = generateNotes();


var findButton = document.getElementById('find');
var findText = document.getElementById('findThis');
var replaceButton = document.getElementById('replace');
var replaceText = document.getElementById('replaceThis');
var clipboardButton = document.getElementById('clipboard');
var clipboardText = document.getElementById('noteThis');

function scanningToggle(params) {
	if (params === "On") {
		timer = setInterval(function(){scanText();}, 200);
		console.log("Scanning on");
	} else {
		clearInterval(timer);
		console.log("Scanning off");
	}
}


function msgData(params){
	var newData = JSON.parse(params);
	console.log(newData);
}

function scanText(){
	bakeCookies();
}

var clipButtons = document.getElementsByClassName("input-group-append");
for (var i = 0; i < clipButtons.length; i++) {
	clipButtons[i].addEventListener('click', function(event) {
		var what = this.parentNode.childNodes;
		console.log(`${what[1]} is input`);
		var clipboard = what[1].value;
		csInterface.evalScript(`textFromClipboard('${clipboard}')`)
		console.log(`${clipboard} to be injected`);
	}, false)
}

var displayButtons = document.getElementsByClassName("input-group-prepend");
for (var i = 0; i < displayButtons.length; i++) {
	if (i > 2) {
		break;
	}
	displayButtons[i].addEventListener('click', function(event) {
		var what = this.parentNode;
		console.log(`${what.id} is target`);
		if (what.style.display !== 'none') {
			what.style.display === 'none';
		}
	}, false)
}




replaceButton.addEventListener('click', function(event){
	var currentFind = findText.value;
	var currentReplace = replaceText.value;
	console.log(`${currentFind} replaced with ${currentReplace}`);
	csInterface.evalScript(`main('switch', '${currentFind}', '${currentReplace}')`)
}, false)

findButton.addEventListener('click', function(event){
	var currentFind = findText.value;
	csInterface.evalScript(`main('select', '${currentFind}', 'none')`)
}, false);

function toggleSize(params) {
	var toggle = ['note', 'findContainer', 'replaceContainer'];
	for (var i = 0; i < toggle.length; i++) {
		var prop = document.getElementById(toggle[i]);
		if (params === 'On') {
			prop.style.display = 'none';
		} else {
			prop.style.display = 'flex';
		}
		console.log(prop);
	}
}

function generateNotes() {
	console.log(`Generating 3 notes`);
	for (var i = 0; i < 3; i++){
		var inputGroup = document.createElement("div");
		inputGroup.classList.add("input-group");
		inputGroup.id = "note";
		var a = document.createElement("div");
		var prependA = document.createElement("span");
		var iconA = document.createElement("span");
		a.classList.add("input-group-prepend");
		prependA.classList.add("input-group-text");
		iconA.classList.add("fa");
		if (i < 1) {
			a.id = "plusButton";
			prependA.id = "plusNew";
			iconA.classList.add("fa-plus");
			iconA.id = "plusMark";
		} else {
			a.id = "minusButton";
			prependA.id = "minusNew";
			iconA.classList.add("fa-minus");
			iconA.id = "minusMark";
		}
		prependA.appendChild(iconA);
		a.appendChild(prependA);
		inputGroup.appendChild(a);
		var b = document.createElement("input");
		b.type = "text";
		b.classList.add("form-control");
		inputGroup.appendChild(b);
		var c = document.createElement("div");
		var appendC = document.createElement("span");
		var iconC = document.createElement("span");
		c.classList.add("input-group-append");
		c.id = "clipboardButton";
		appendC.classList.add("input-group-text");
		appendC.id = "clipboard";
		iconC.classList.add("fa");
		iconC.classList.add("fa-clipboard");
		iconC.id = "icon";
		appendC.appendChild(iconC);
		c.appendChild(appendC);
		inputGroup.appendChild(c);
		var parentDiv = document.getElementById("content");
		parentDiv.insertBefore(inputGroup, listHold);
	};
}




// var CSLibrary = new CSInterface();
// CSLibrary.registerKeyEventsInterest([{
// "keyCode": 8,
// "ctrlKey": true
// }]);
//
// function keyDownInBody(event) {
// 	if(event.keyCode == 67 && event.ctrlKey == true) {
// 		var selectedText = ""
// 		if (window.getSelection){ // all modern browsers and IE9+
// 			selectedText = window.getSelection().toString();
// 			document.execCommand("copy");
// 			console.log("detected");
// 		}
// 	}
// }
