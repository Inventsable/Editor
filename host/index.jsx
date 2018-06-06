// alert(docName());

function docName() {
  return app.project.activeItem.name;
}

// thanks Horshack @https://forums.adobe.com/thread/2317720
function dumpPropTree(rootObj, nestingLevel, type, find, replace) {
    var countProps = rootObj.numProperties;
    for (var propIndex=1; propIndex <= countProps; propIndex++) {
        var prop = rootObj.property(propIndex);
          if (prop.name === find) {
            if (type === "switch") {
              prop.name = replace;
            } else if (type === "select") {
              prop.selected = true;
            }
          }
        if (prop.numProperties > 0)
        dumpPropTree(prop, nestingLevel+1, type, find, replace);
    }
}

function main(type, find, replace) {
    var activeComp = app.project.activeItem;
    var countSelectedLayers = activeComp.layers.length;
    for (selectedLayerIndex = 1; selectedLayerIndex <= countSelectedLayers; selectedLayerIndex++) {
        var layer = activeComp.layers[selectedLayerIndex];
        dumpPropTree(layer, 0, type, find, replace);
    }
}
