function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function updateLabel() {
        $.label.text = Math.round($.slider.value) + "s";
    }
    function testPatience() {
        Alloy.createController("dialog").show(1e3 * $.slider.value);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "#fff",
        backgroundImage: "/bg_tan.png",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.title = Ti.UI.createLabel({
        color: "#000",
        top: 0,
        height: 46,
        width: Ti.UI.FILL,
        textAlign: "center",
        font: {
            fontSize: 24,
            fontWeight: "bold"
        },
        backgroundImage: "/title_green.png",
        text: "Patience Tester",
        id: "title"
    });
    $.__views.index.add($.__views.title);
    $.__views.container = Ti.UI.createView({
        height: 170,
        width: 250,
        top: 80,
        borderColor: "#000",
        borderWidth: 2,
        borderRadius: 16,
        backgroundGradient: {
            type: "linear",
            startPoint: {
                x: "0%",
                y: "0%"
            },
            endPoint: {
                x: "0%",
                y: "100%"
            },
            colors: [ "#4db33e", "#1e8010" ]
        },
        right: 10,
        id: "container"
    });
    $.__views.index.add($.__views.container);
    $.__views.label = Ti.UI.createLabel({
        color: "#000",
        text: "5s",
        top: 10,
        font: {
            fontSize: 140,
            fontWeight: "bold"
        },
        textAlign: "center",
        id: "label"
    });
    $.__views.container.add($.__views.label);
    $.__views.slider = Ti.UI.createSlider({
        min: 1,
        max: 10,
        value: 5,
        leftTrackImage: "/title_green.png",
        top: 228,
        left: -145,
        width: 350,
        transform: Alloy.CFG.sliderTransform,
        id: "slider"
    });
    $.__views.index.add($.__views.slider);
    updateLabel ? $.__views.slider.addEventListener("change", updateLabel) : __defers["$.__views.slider!change!updateLabel"] = true;
    $.__views.testButton = Ti.UI.createButton({
        backgroundImage: "/button_green.png",
        bottom: 30,
        height: 50,
        width: 180,
        right: 15,
        title: "Test Patience",
        id: "testButton"
    });
    $.__views.index.add($.__views.testButton);
    testPatience ? $.__views.testButton.addEventListener("click", testPatience) : __defers["$.__views.testButton!click!testPatience"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    require("specs/index")($);
    var foo = require("foo").foo;
    foo();
    __defers["$.__views.slider!change!updateLabel"] && $.__views.slider.addEventListener("change", updateLabel);
    __defers["$.__views.testButton!click!testPatience"] && $.__views.testButton.addEventListener("click", testPatience);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;