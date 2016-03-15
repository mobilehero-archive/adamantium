var optimizer = require('../optimizer'),
	CONST = require('../../../common/constants'),
	_ = require("lodash");


exports.process = function(ast, config) {
	config = config ? config.alloyConfig : {};
	config.deploytype = config.deploytype || 'development';

	// create list of platform defines
	var defines = {};
	_.each(CONST.PLATFORMS, function(p) {
		defines['OS_' + p.toUpperCase()] = config.platform === p;
	});
	return optimizer.optimize(ast, defines);
};