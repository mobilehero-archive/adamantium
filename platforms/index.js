var fs = require('fs'),
	path = require('path'),
	_ = require('../Alloy/lib/alloy/underscore')._;

module.exports = (function() {
	var obj = {};
	_.each(fs.readdirSync(__dirname), function(file) {
		if (fs.existsSync(path.join(__dirname,file,'index.js'))) {
			obj[file] = require('./' + file + '/index');
		}
	});
	return obj;
})();