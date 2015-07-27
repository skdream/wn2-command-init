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
var util = require('./lib/util.js');

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


    commander.action(function () {
        var args = Array.prototype.slice.call(arguments);
        var options = args.pop();
        var template = args.shift();

        if (options.verbose) {
            fis.log.level = fis.log.L_ALL;
            fis.log.throw = true;
        }

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
				message:'项目类型:',               // The question to print
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
	check_dir('src'); // 检测当前目录是否存在src
 	var snailGames;
	var download = new Download({ extract: true, strip: 1 ,mode: '755'})
    .get(fis.get('snailGameList')||'https://raw.githubusercontent.com/snail-team/wn-data/master/snailGames.json')
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
    	var gameNameQ = {
    		type:   'list',              
			name:   'gameName',             
			message:'游戏名称：', 
			default:'九阴真经',
			choices:gameChoices
    	};
    
    	inquirer.prompt(gameNameQ, function( answers ) {

			var domains = [];
			var domainRootMap = {};
			var gameName = answers.gameName;
    		var server = snailGames[gameName].server;
    		var len = server.length;
    		var gameInfo = snailGames[gameName];
    		var questions = [];

    		while(len--){
    			domains.push(server[len].domain);
    			domainRootMap[server[len].domain] = server[len].root;
    		}

    		if(domains.length){
				var gameDomainQ = {
					type:   'list',              
					name:   'domain',             
					message:'网站域名：', 
					// default:'www.woniu.com',
					choices:domains
				}
				questions.push(gameDomainQ);
    		}
	    	questions = questions.concat(conf.config.prompt);

    		inquirer.prompt(questions, function( answers ) {
				var root = domainRootMap[answers.domain] ||'';
				answers['domain'] = answers.domain || 'http://www.woniu.com/';
				var htmlData = fis.util.merge(gameInfo,{root:root});
				htmlData = fis.util.merge(htmlData,{gameName:gameName});
				htmlData = fis.util.merge(htmlData,answers);
				htmlData = fis.util.merge(htmlData, {template:templateName});
				//console.log(htmlData);
				var repos = conf.config.repos;
				var respo_url = getGit_url(repos);
				//	var source_path = conf.config.path || 'src';
				fis.log.notice('准备下载...');
				var download = new Download({ extract: true, strip: 1 ,mode: '755'})
				.get(respo_url)
				.dest('./')
				.use(downloadStatus())
				.run(function(err, files){
					deploy(htmlData,conf)
				});
    		});
		});
    });
}



function deploy(htmlData,conf){

	// 删除文件
	fs.exists('./README.md', function(exists){
		if(exists){
			fs.unlinkSync('./README.md');
		}
	});

	var curDirName = path.basename(process.cwd());
	var date = new Date();
	var yy = date.getFullYear();
	var mm = date.getMonth() + 1;
		mm = mm>9 ?mm: '0'+mm;
	var siteRoot = "/opt/htdocs/cmsv3/cmsroot/sites/";
	var deployPath = {
		"site"      : "static/web" + yy +mm,
		"m-site"    : "static/web" + yy +mm,
		"special"   : "static/act/" + yy +mm + '/'+curDirName,
		"m-special" : "static/act/" + yy +mm + '/'+ curDirName,
		"page"      : "/"
	}

	if(htmlData.root===''){
		console.log('此站点未配置发布目录，请手动修改fis-config.js配置文件');
		htmlData.root="[站点目录]";
	}
	htmlData['root'] = siteRoot + htmlData.root + '/'+deployPath[htmlData['template']];

	if(htmlData.domain){
		var dmArr = htmlData.domain.split('.'),
			dmPrefixName = '';
		dmPrefixName = (dmArr[0]=== 'm')? dmArr[1]: dmArr[0];
		htmlData['domain'] = 'http://' + htmlData['domain'];
	}

	htmlData['pageName'] = htmlData.domain + '@' + curDirName;
	htmlData['dmPrefixName'] = dmPrefixName;
	htmlData['date'] = (new Date()).toDateString()



	var files = util.find('./','',new RegExp('(\\.md)$','g'));
	fis.util.map(htmlData,function(k,v){
		fis.util.map(files,function(index,filepath){
			var keyword_reg = conf.config.keyword_reg || /\<\%\=([\s\S]*?)\%\>/ig;
			//var fileIgnore=new RegExp('(\\.git)|(fis-conf\\.js)$|(\\.jpg)$|(\\.png)$|(\\.gif)$','g');

			if(fs.lstatSync(filepath).isSymbolicLink() === false && fis.util.isTextFile(filepath)){

				var content = fs.readFileSync(filepath, 'utf8');
				if(typeof content == 'object'){
					content=JSON.stringify(content);
				}
				content = content.replace(keyword_reg,function(m, $1){
					if($1 ===k){
						m = v;
					}
					return m;
				});
				fis.util.fs.writeFileSync(filepath, content, 'utf8');
			}
		})
	});
}

// 检查当前目录是否已有文件
function check_dir(dir){
	var dir = path.resolve(dir);
	 if (fis.util.fs.existsSync(dir) && process.cwd() != dir) {
        fis.log.error('the directory has already exist, the process will stop.');
    }
}
/**
 * @param id
 * @param type
 * return url
 */
function getGit_url(id){

	var repos = '',
		postfix = '';

	if(id.indexOf('snail-team')>-1){
	    repos = 'https://codeload.github.com/';
	    postfix = '/tar.gz/';
	}else{
		repos = 'http://git.woniu.com:3600/';
		postfix = '/repository/archive.tar.gz?ref=';
	}

	if(!id){
		new Error('must given a component ID')
	}
	var c = id.split('@');
    if (!c[1]) {
        c[1] = 'master';
    }
    return  repos + c[0] + postfix + c[1];
}
