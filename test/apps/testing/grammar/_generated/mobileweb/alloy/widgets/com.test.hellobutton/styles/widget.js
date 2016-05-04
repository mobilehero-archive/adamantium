function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.test.hellobutton/" + s : s.substring(0, index) + "/com.test.hellobutton/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0001,
    key: "helloButton",
    style: {
        backgroundImage: WPATH("hello.png"),
        height: 135,
        width: 233
    }
} ];