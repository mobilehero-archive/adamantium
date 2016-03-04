var path = require('path'),
	fs = require('fs'),
	_ = require('../../../lib/alloy/underscore')._,
	uglifyjs = require('uglify-js'),
	logger = require('../../../logger'),
	U = require('../../../utils');

var EXCLUDE = ['backbone','CFG','underscore'];
var BUILTINS_PATH = path.join(__dirname,'..','..','..','builtins');
var loaded = [];

function appendExtension(file, extension) {
	extension = '.' + extension;
	file = U.trim(file);

	var len = extension.length;
	if (file.substring(file.length - extension.length) !== extension) {
		return file + extension;
	} else {
		return file;
	}
}

function loadBuiltin(source, name, dest) {
	if (!path.existsSync(source)) {
		return;
	}

	logger.debug('  - [' + name + '] --> "' + dest + '"');
	U.copyFileSync(source, dest);
	loaded = _.union(loaded, [name]);
}

function loadMomentLanguages(config) {
	// retrieve the languages of the project
	var i18nPath = path.join(config.dir.project, 'i18n');
	if (fs.existsSync(i18nPath)) {
		var languages = _.filter(fs.readdirSync(i18nPath), function(file) {
			return fs.statSync(path.join(i18nPath,file)).isDirectory();
		});

		// filter the momentjs translation files that match one of these languages
		var availableI18nPath = path.join(BUILTINS_PATH,'moment','lang');
		var fileNames = _.filter(fs.readdirSync(availableI18nPath), function(file) {
			return _.indexOf(languages, file.substr(0, 2)) !== -1;
		});

		// import these files
		_.each(fileNames, function(file) {
			var source = path.join(BUILTINS_PATH,'moment','lang',file);
			var dest = path.join(config.dir.resources,'alloy','moment','lang',file);
			loadBuiltin(source, file, dest);
		});
	}
}

exports.process = function(ast, config) {
	var rx = /^(alloy)\/(.+)$/;
	var match;

	ast.walk(new uglifyjs.TreeWalker(function(node) {
		if (node instanceof uglifyjs.AST_Call) {
			var theString = node.args[0];
			if (node.expression.name === 'require' &&            // Is this a require call?
				theString && _.isString(theString.value) &&      // Is the 1st param a literal string?
				(match = theString.value.match(rx)) !== null &&  // Is it an alloy module?
				!_.contains(EXCLUDE, match[2]) &&                // Make sure it's not excluded.
				!_.contains(loaded, match[2])                    // Make sure we didn't find it already
			) {
				// Make sure it hasn't already been copied to Resources
				var name = appendExtension(match[2], 'js');
				if (fs.existsSync(path.join(config.dir.resources,match[1],name))) {
					return;
				}

				// make sure the builtin exists
				var source = path.join(BUILTINS_PATH,name);
				var dest = path.join(config.dir.resources,'alloy',name);
				loadBuiltin(source, name, dest);

				if ('moment.js' === name) {
					// if momentjs is required in the project, also load the
					// localizations which may be used
					loadMomentLanguages(config);
				}
			}
		}
	}));
	return ast;
};
