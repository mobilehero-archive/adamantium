function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function closeWindow() {
        $.landingPageWindow.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "LandingPage";
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
    $.__views.landingPageWindow = Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "landingPageWindow"
    });
    $.__views.landingPageWindow && $.addTopLevelView($.__views.landingPageWindow);
    $.__views.__alloyId0 = Alloy.createController("middle", {
        id: "__alloyId0",
        __parentSymbol: $.__views.landingPageWindow
    });
    $.__views.__alloyId0.setParent($.__views.landingPageWindow);
    $.__views.__alloyId1 = Ti.UI.createButton({
        top: 200,
        width: 200,
        height: 50,
        title: "CLOSE WINDOW",
        id: "__alloyId1"
    });
    $.__views.landingPageWindow.add($.__views.__alloyId1);
    closeWindow ? $.addListener($.__views.__alloyId1, "click", closeWindow) : __defers["$.__views.__alloyId1!click!closeWindow"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.__alloyId1!click!closeWindow"] && $.addListener($.__views.__alloyId1, "click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;