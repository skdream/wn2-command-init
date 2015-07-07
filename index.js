/**
 * woniu.com
 */

'use strict';

/* eslint-disable fecs-camelcase, camelcase, max-nested-callbacks */

var spawn = require('child_process').spawn;

exports.name = 'init';
exports.usage = '<command> [options]';
exports.desc = 'A awesome scaffold of fis';

var templates = require('./config/scaffold.js');
var fs = require('fs');
var path = require('path');


exports.register = function(commander){
	fis.util.map(templates,function(index, elem) {

		console.log(index);
	})
}

