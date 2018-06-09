var csInterface = new CSInterface();
var appName = csInterface.hostEnvironment.appName;
var isScanning = true;
var isToggle = false;

  var menuXML = '<Menu> \
  \
  <MenuItem Label="---" /> \
  \
  <MenuItem Id="fullsize" Label="Fullsize Editor" Enabled="true" Checked="false"/> \
  <MenuItem Id="scanning" Label="Scanning" Enabled="true" Checked="true"/> \
  <MenuItem Id="fulldata" Label="Log data to file" Enabled="true" Checked="false"/> \
  <MenuItem Id="refresh" Label="Refresh panel" Enabled="true" Checked="false"/> \
  </Menu>';

csInterface.setPanelFlyoutMenu(menuXML);
csInterface.addEventListener("com.adobe.csxs.events.flyoutMenuClicked", setPanelCallback);

function setPanelCallback(event) {
  if (event.data.menuId == "refresh") {
    location.reload();
  } else if (event.data.menuId == "fullsize") {
    isToggle = !isToggle;
    csInterface.updatePanelMenuItem("Fullsize Editor", true, isToggle);
    if (isToggle) {
      toggleSize("On");
    } else {
      toggleSize("Off");
    }
  } else if (event.data.menuId == "scanning") {
    isScanning = !isScanning;
    csInterface.updatePanelMenuItem("Scanning", true, isScanning);
    if (isScanning) {
      scanningToggle("On");
    } else {
      scanningToggle("Off");
    }
  } else if (event.data.menuId == "fulldata") {
    // csInterface.evalScript('docName()', msgData)
    var path = csInterface.getSystemPath(SystemPath.EXTENSION) + "/client/testRead.js";
    var data = datum;

    var newThis = [];
    var result = Object.keys(datum).map(function(key) {
      return newThis.push(datum[key]);
    });
    console.log(result);
    console.log(newThis);

    console.log(path + ", " + data);
    var result = window.cep.fs.writeFile(path, data);
    // var result = window.cep.fs.readFile(path);
    if (0 == result.err) {
         console.log("Success");
         // console.log(result);
    } else {
         console.log(result.err);
    }
    // var newFile = createTempFolder() + name + '.txt'
  }
}


// var createTempFolder = function() {
//   var tempFolderName = 'com.adobe.textEditor/';
//   var tempFolder = '/tmp/' + tempFolderName;
//   if (window.navigator.platform.toLowerCase().indexOf('win') > -1) {
//     tempFolder = csInterface.getSystemPath(SystemPath.USER_DATA) + '/../Local/Temp/' + tempFolderName;
//   }
//   window.cep.fs.makedir(tempFolder);
//   return tempFolder;
// };



console.log("Menu loaded");
