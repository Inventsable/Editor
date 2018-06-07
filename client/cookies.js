var csInterface = new CSInterface();
var extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) + "/client/";
var texthistory = [];

if (document.cookie.length < 1) {
  console.log("Creating first cookies.");
  resetAllCookies();
} else {
  console.log("Cookies already exist.");
  // convertCookiesToHistory("1");
}

// resetAllCookies();

var panels = ["main", "findContainer", "replaceContainer"];
var info = ["mainThis", "findThis", "replaceThis"];
var data = [];

function bakeCookies(){
  while (data.length > 0) {
    data.pop();
  }
  for (var i = 0; i < panels.length; i++) {
    var prop = document.getElementById(info[i]);
    setCookie(panels[i], prop.value, 30);
    data.push(prop.value);
  }
  console.log(`after: ${data}`);
}

function eatCookies(){
  for (var i = 0; i < panels.length; i++) {
    var prop = document.getElementById(info[i]);
    var recipe = getCookie(panels[i]);
    prop.value = recipe;
  }
}

function resetAllCookies(){
  var reset = ["Input box", "Select this", "text in Find"];
  while (data.length > 0) {
    data.pop();
  }
  for (var i = 0; i < panels.length; i++) {
    var prop = document.getElementById(info[i]);
    setCookie(panels[i], reset[i], 30);
    prop.value = reset[i];
    data.push(prop.value);
  }
  console.log(`after: ${data}`);
}

function removeLastComma(str) {
   return str.replace(/,(\s+)?$/, '');
}

function consoleCookie() {
  console.log(document.cookie);
}

function deleteAllCookies() {
  var cookies = document.cookie.split(";");
	for (var i = 1; i <= cookies.length; i++)
	{
    document.cookie = panels[i] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=" + extensionRoot + ";";
	}
}



function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=C:/Users/PortablePawnShop/AppData/Local/Temp/cep_cache/ILST_22.1.0_com.multi.app.panel";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var historyCookie=getCookie("textHistory");
    if (historyCookie != "") {
        alert("Welcome again " + historyCookie);
    } else {
       historyCookie = prompt("Please enter your name:","");
       if (historyCookie != "" && historyCookie != null) {
           setCookie("textHistory", historyCookie, 30);
       }
    }
}

function deleteCookie(cookiename)
    {
        var d = new Date();
        d.setDate(d.getDate() - 1);
        var expires = ";expires="+d;
        var path = ";path=" + extensionRoot + ";";
        var name=cookiename;
        var value="";
        document.cookie = name + "=" + value + expires + path;
    }


function clearListCookies()
{
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++)
    {
        var spcook =  cookies[i].split("=");
        deleteCookie(spcook[0]);
    }
    function deleteCookie(cookiename)
    {
        var d = new Date();
        d.setDate(d.getDate() - 1);
        var expires = ";expires="+d;
        var name=cookiename;
        var value="";
        document.cookie = name + "=" + value + expires + "; path=/acc/html";
    }
    window.location = "";
}
