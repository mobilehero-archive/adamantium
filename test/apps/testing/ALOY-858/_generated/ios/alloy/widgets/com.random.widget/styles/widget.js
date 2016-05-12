function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.random.widget/" + s : s.substring(0, index) + "/com.random.widget/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isApi: true,
    priority: 1000.0001,
    key: "Label",
    style: {
        top: "5dp",
        color: "gray",
        font: {
            fontSize: "12dp",
            fontWeight: "bold"
        },
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        right: 20
    }
}, {
    isId: true,
    priority: 100000.0002,
    key: "header",
    style: {
        top: "20dp"
    }
} ];