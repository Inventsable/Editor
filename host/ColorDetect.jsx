(function() {
    var composition = app.project.activeItem;
    if (!composition || !(composition instanceof CompItem)) {
        return alert("Please select composition first");
    }

    var layer = composition.selectedLayers[0];
    if (!layer) {
        return alert('Please select a layer');
    }

    var colorProperties = getProperties(layer, isVisibleColorPropery);
    alert("Found " + colorProperties.length + " properties:\n" + colorProperties.join('\n'));


    function isVisibleColorPropery(property) {
        return  property.propertyValueType === PropertyValueType.COLOR && !isHidden(property);
    }

    function isHidden(property) {
        var oldExpression = property.expression;
        try {
            // try to add some dummy expression;
            // If it errors out - this means property is hidden
            // overwise property can be modified
            property.expression = "some dummy expression;";
        } catch (e) {
            return true;
        }


        // Set expression to it's old value;
        property.expression = oldExpression;
        return false;
    }

    function getProperties(property, callback, colorProperties) {
        colorProperties = colorProperties || [];

        var curProperty;
        for (var i = 1, il = property.numProperties; i <= il; i++) {
            curProperty = property.property(i);

            if (callback(curProperty)) {
                colorProperties.push(curProperty.matchName);
            }

            getProperties(curProperty, callback, colorProperties);
        }
        return colorProperties;
    }
})();
