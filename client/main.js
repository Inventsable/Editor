var csInterface = new CSInterface();
var appName = csInterface.hostEnvironment.appName;
var AEpanel_nav = "#161616";
var AEpanel_bg = "#232323";

loadJSX("json2.jsx");
loadJSX(`${appName}.jsx`);
console.log(`Loading for ${appName}`);

window.onload = eatCookies();
window.onload = scanningToggle("On");
window.onload = generateNotes();
// window.onload = callDoc();

var menus = ["name", "color", "expression"];

var findButton = document.getElementById('find');
var findText = document.getElementById('findThis');
var replaceButton = document.getElementById('replace');
var replaceText = document.getElementById('replaceThis');
var clipboardButton = document.getElementById('clipboard');
var clipboardText = document.getElementById('noteThis');

var col_light = '#b9b9b9';
var col_faded = '#545454';
var col_bg = '#232323';

var toggleMark = document.getElementById('toggleMark');
var selectMark = document.getElementById('selectMark');
var selectButton = document.getElementById('selectButton');
var openButton = document.getElementById('openButton');
var dropDown = document.getElementById('dropDown');

var menuName = document.getElementById('name');
var menuColor = document.getElementById('color');
var menuExp = document.getElementById('exp');

callDoc();
setSelectState();
setFindMenu();

function setFindMenu() {
	if (datum.findState === 'name') {
		menuName.setAttribute('selected', true);
	} else if (datum.findState === 'color') {
		menuColor.setAttribute('selected', true);
	} else if (datum.findState === 'exp') {
		menuExp.setAttribute('selected', true);
	}
}


function callDoc() {
	csInterface.evalScript(`docName()`, getDoc);
	setLayout();
	bakeCookies();
}

function setLayout() {
	if (datum.layoutState === 1) {
		toggleSize("On");
	} else {
		toggleSize("Off");
	}
	if (datum.findState === 'name') {
			toggleMark.classList.add("fa-font");
			findText.value = boot.nameFind;
			replaceText.value = boot.nameReplace;
		} else if (datum.findState === 'color') {
			toggleMark.classList.add("fa-eyedropper");
			findText.value = boot.colorFind;
			replaceText.value = boot.colorReplace;
		} else if (datum.findState === 'expression') {
			toggleMark.classList.add("fa-code");
			findText.value = boot.expFind;
			replaceText.value = boot.expReplace;
		}
}

function getDoc(params) {
	var newData = JSON.parse(params);
	datum.comp = newData.comp;
}


dropDown.addEventListener("focusout", function(){
	var menu = dropDown.children;
	datum.findState = menu[3].value;
	setFindState();
}, false)
dropDown.addEventListener("click", function(event){
	datum.findState = menus[event.target.selectedIndex]
	setFindState();
}, false)

selectButton.addEventListener("click", function(event){
	var toSelected = datum.selectState;
	console.log(`${datum.selectState} is ${toSelected}`);
	toSelected = !toSelected;
	datum.selectState = toSelected;
	console.log(`${datum.selectState} is ${toSelected}`);
	setSelectState();
}, false)

function setFindState() {
	toggleMark.classList.remove("fa-font", "fa-eyedropper", "fa-code");
	if (datum.findState === 'name') {
		toggleMark.classList.add("fa-font");
		findText.value = boot.nameFind;
		replaceText.value = boot.nameReplace;
		console.log("set to name");
	} else if (datum.findState === 'color') {
		toggleMark.classList.add("fa-eyedropper");
		findText.value = boot.colorFind;
		replaceText.value = boot.colorReplace;
		console.log("set to color");
	} else if (datum.findState === 'expression') {
		toggleMark.classList.add("fa-code");
		findText.value = boot.expFind;
		replaceText.value = boot.expReplace;
		console.log("set to expression");
	}
}

function setSelectState() {
	if (datum.selectState == true) {
		console.log("Selection on");
		selectMark.style.color = col_light;
	} else {
		console.log("Selection off");
		selectMark.style.color = col_faded;
	}
}

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


var submits = ["findThis", "replaceThis", "note0", "note1", "note2"];
// var submitsGo = [];
for (var uu = 0; uu < submits.length; uu++) {
	var thisSubmit = document.getElementById(submits[uu]);
	thisSubmit.addEventListener("keyup", function(event){
		if (event.key === 'Enter') {
			console.log(`Submitting ${event.target.value}`);
			if (event.target.id === 'findThis') {
				if (datum.findState === 'name') {
					csInterface.evalScript(`main('${datum.selectState}', 'select', '${event.target.value}', 'none')`)
					console.log(`main('${datum.selectState}', 'select', '${event.target.value}', 'none')`);
				}
			} else if (event.target.id === 'replaceThis') {
				var currentFind = findText.value;
				var currentReplace = replaceText.value;
				console.log(`${currentFind} replaced with ${currentReplace}`);
				csInterface.evalScript(`main('${datum.selectState}','${datum.findState}', '${currentFind}', '${currentReplace}')`)
			} else if (event.target.id === 'noteText0') {
				csInterface.evalScript(`textFromClipboard('${event.target.value}')`)
				console.log(`${event.target.value} to be injected`);
			} else if (event.target.id === 'noteText1') {
				csInterface.evalScript(`textFromClipboard('${event.target.value}')`)
				console.log(`${event.target.value} to be injected`);
			} else if (event.target.id === 'noteText2') {
				csInterface.evalScript(`textFromClipboard('${event.target.value}')`)
				console.log(`${event.target.value} to be injected`);
			}
			var thisButton = event.target.parentNode.children;
			// console.log(`${thisButton[0]}`);
			// console.log(`${this.style.backgroundColor}`);
		} else if (event.key === 'Backspace') {
			if (event.shiftKey === true) {
				event.target.value = '';
			}
			console.log(event);
		}
	}, false);
}

function fadeThis(ele){
	ele.style.backgroundColor = col_bg;
	// setTimeout(fade, 200);
}



function scanText(){
	bakeCookies();
	if (datum.findState === 'name') {
		boot.nameFind = findText.value;
		boot.nameReplace = replaceText.value;
	} else if (datum.findState === 'color') {
		boot.colorFind = findText.value;
		boot.colorReplace = replaceText.value;
	} else if (datum.findState === 'expression') {
		boot.expFind = findText.value;
		boot.expReplace = replaceText.value;
	}
	console.log(`${findText.value}, ${replaceText.value}`);
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
	csInterface.evalScript(`main('${datum.selectState}','${datum.findState}', '${currentFind}', '${currentReplace}')`)
}, false)

findButton.addEventListener('click', function(event){
	var currentFind = findText.value;
	csInterface.evalScript(`main('${datum.selectState}', 'select', '${currentFind}', 'none')`)
}, false);

function toggleSize(params) {
	var toggle = ['note0', 'note1', 'note2', 'dropDown', 'findContainer', 'replaceContainer'];
	if (params === 'On') {
		datum.layoutState = 1;
	} else {
		datum.layoutState = 0;
	}
	console.log(datum.layoutState);
	for (var i = 0; i < toggle.length; i++) {
		var prop = document.getElementById(toggle[i]);
		if (params === 'On') {
			prop.style.display = 'none';
		} else {
			prop.style.display = 'flex';
		}
		console.log(prop);
	}
	setCookie("layoutState", datum.layoutState, 30);
	bakeCookies();
}

function generateNotes() {
	console.log(`Generating 3 notes`);
	for (var i = 0; i < 3; i++){
		var inputGroup = document.createElement("div");
		inputGroup.classList.add("input-group");
		inputGroup.id = "note" + i;
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
		b.id = "noteText" + i;
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
