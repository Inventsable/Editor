var csInterface = new CSInterface();
var appName = csInterface.hostEnvironment.appName;
var AEpanel_nav = "#161616";
var AEpanel_bg = "#232323";
loadJSX("index.jsx");
console.log(`Loading for ${appName}`);
window.onload = eatCookies();
window.onload = scanningToggle("On");

var findButton = document.getElementById('find');
var findText = document.getElementById('findThis');
var replaceButton = document.getElementById('replace');
var replaceText = document.getElementById('replaceThis');

function scanningToggle(params) {
	if (params === "On") {
		timer = setInterval(function(){scanText();}, 200);
		console.log("Scanning on");
	} else {
		clearInterval(timer);
		console.log("Scanning off");
	}
}

function scanText(){
	bakeCookies();
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
