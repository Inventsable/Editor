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
  <MenuItem Id="fulldata" Label="Log data to console" Enabled="true" Checked="false"/> \
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
    csInterface.evalScript('docName()', msgData)
  }
}

console.log("Menu loaded");
