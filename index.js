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
var fse = require("fs-extra");
var path = require('path');
var inquirer = require("inquirer");
var Download = require('download');
var downloadStatus = require('download-status');

exports.register = function(commander){

	commander
	    .option('-n, --name <name>', 'game id', String, null)
        .option('-v, --verbose', 'output verbose help', Boolean, false);

	commander.on('--help', function(){
	  console.log('  Examples:');
	  console.log('');
	  console.log('    $ init');
	  console.log('    $ init site');
	  console.log('    $ init m-site');
  	  console.log('    $ init special');
	  console.log('    $ init m-special');
	  console.log('');
	});

	var templateLists = [];
	fis.util.map(templates,function(key, info) {

		templateLists.push(key);
		//console.log(JSON.stringify(key) + ':' + JSON.stringify(info));
		commander
			.command(key)
			.description('create a ' + key)
	})

/*
	commander
	  .command('*')
	  .action(function(env){
	    console.log('deploying "%s"', env);
	  });

	commander.parse(process.argv);

*/

    commander.action(function () {
        var args = Array.prototype.slice.call(arguments);
        var options = args.pop();
        var template = args.shift();

        if (options.verbose) {
            fis.log.level = fis.log.L_ALL;
            fis.log.throw = true;
        }

/*
        if (!template) {
            commander.outputHelp();
            return;
        }

     	if (!options.name) {
            fis.log.error('should specify a name with --name.'); 
            console.log(options.name);       
        }

        template = template.split('@');
        var version = template.length ===2 ? template[1] : 'master';

        var name = template[0];

        var conf = templates[name];
        if(!conf){
        	fis.log.error('invalid init command, see -h');
        }
*/
		var version='';
		var templateName = '';
		var conf ='';
		if(template){
	        template = template.split('@');
	        version = template.length ===2 ? template[1] : 'master';
	        templateName = template[0];
	        conf = templates[templateName];

	        if(!conf){
	        	fis.log.error('invalid init command, see -h');
	        }
	        getGameChoice(conf,templateName);
		}else{
			var questions = [{
				type:   'list',               // input, confirm, list, rawlist, password
				name:   'template',               // (String) The name to use when storing the answer in the anwers hash
				message:'选择您要创建的项目类型',               // The question to print
				default:'site',               // Default value(s) to use if nothing is entered
				choices:templateLists,               // Choices array or a function returning a choices array
				// validate:function(input){ //Receive the user input and should return true if the value is valid, and an error message (String) otherwise. If false is returned, a default error message is provided.
				// },
				// when:function(answers){   // Receive the current user answers hash and should return true or false depending on whether or not this question should be asked
				// }
			}];
			inquirer.prompt(questions, function( answers ) {
				templateName = answers.template;
				conf = templates[templateName];			
				getGameChoice(conf,templateName);
			});
		}
    });
}


function getGameChoice(conf,templateName){
    //var dir = process.cwd();
	//check_dir('src'); // 检测当前目录是否存在src

 	var snailGames;
	var download = new Download({ extract: true, strip: 1 ,mode: '755'})
	    .get(fis.config.get('snailGameList')||'https://raw.githubusercontent.com/snail-team/wn-data/master/snailGames.json')
	    .dest('./')
	    .use(/*downloadStatus()*/)
	    .run(function(err, files){

	    	snailGames=fse.readJsonSync('./snailGames.json');
	    	fse.removeSync('./snailGames.json');

	    	var gameChoices = [];
	    	for(var gamename in snailGames){
	    		if(snailGames[gamename].gameId !== ''){
	    			gameChoices.push(gamename);
	    		}
	    	}

	    	var questions = [];

	    	var gameNameQ = {
	    		type:   'list',              
				name:   'gameName',             
				message:'选择游戏名称', 
				default:'九阴真经',
				choices:gameChoices,
	    	};

	    	questions.push(gameNameQ);
	    	questions = questions.concat(conf.config.prompt);

	    	// console.log(conf.config.prompt);
	    	// console.log(JSON.stringify(questions));

	    	// console.log(questions);

	    	inquirer.prompt(questions, function( answers ) {
	    		console.log(answers);



				return false;
    			var repos = conf.config.repos;
				var respo_url = getGit_url(repos);

				// inquirer.prompt(questions, function( answers ) {
				// 	name = answers.template;
				// 	conf = templates[name];			
				// 	downLoadTemplate(conf);
				// });

			 	fis.log.notice('准备下载...');
				var download = new Download({ extract: true, strip: 1 ,mode: '755'})
				    .get(respo_url)
				    .dest('src')
				    .use(downloadStatus())
				    .run(function(err, files){
				    	
				    });				
			});			
	    });
	}

function downLoadTemplate(){

}

function deploy(){

}

function check_dir(dir){
	var dir = path.resolve(dir);
	 if (fis.util.fs.existsSync(dir) && process.cwd() != dir) {
        fis.log.error('the directory has already exist, the process will stop.');
    }
}

function getGit_url(id){
	var repos = 'https://codeload.github.com/';
	var postfix = '/tar.gz/';
	if(!id){
		new Error('must given a component ID')
	}
	var c = id.split('@');
    if (!c[1]) {
        c[1] = 'master';
    }
    return  repos + c[0] + postfix + c[1];
}