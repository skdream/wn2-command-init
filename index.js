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


	 commander
        .option('-v, --verbose', 'output verbose help', Boolean, false);


	commander.on('--help', function(){
	  console.log('  Examples:');
	  console.log('');
	  console.log('    $ init site');
	  console.log('    $ init m-site');
  	  console.log('    $ init special');
	  console.log('    $ init m-special');
	  console.log('');
	});


    commander.action(function () {
        var args = Array.prototype.slice.call(arguments);
        var options = args.pop();
        var template = args.shift();

        if (options.verbose) {
            fis.log.level = fis.log.L_ALL;
            fis.log.throw = true;
        }

        if (!template) {
            commander.outputHelp();
            return;
        }
    });


	fis.util.map(templates,function(index, elem) {

		//console.log(index);
	})
}

