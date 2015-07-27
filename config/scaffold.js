module.exports = {
    'site': {
        'info': 'create a home site',
        'config': {
            'type': 'github',
            'repos': 'snail-team/wn-site-template',
            'prompt': [{
                type:   'input',               // input, confirm, list, rawlist, password
                name:   'frontEnd',               // (String) The name to use when storing the answer in the anwers hash
                message:'前端：'             // The question to print
            },{
                type:'input',
                name:'designer',
                message:'设计：'
            },{
                type:'input',
                name:'cmser',
                message:'后端：'
            }],
            'roadmap': [{
                reg: '**',
                release: '/${app_name}/$&'
            }]
        }
    },
    'm-site': {
        'info': 'create a mobile home site',
        'config': {
            'type': 'github',
            'repos': 'snail-team/m-site-template',
            'prompt': [{
                type:   'input', 
                name:   'frontEnd',
                message:'前端：'
            },{
                type:'input',
                name:'designer',
                message:'设计：'
            },{
                type:'input',
                name:'cmser',
                message:'后端：'
            }],
            'roadmap': [{
                reg: '**',
                release: '/${project_name}/$&'
            }]
        }
    },
    'special': {
        'info': 'create a new sepcial',
        'config': {
            'type': 'github',
            'repos': 'template/special',
            'prompt': [{
                type:   'input',
                name:   'frontEnd',
                message:'前端：'
            },{
                type:'input',
                name:'designer',
                message:'设计：'
            },{
                type:'input',
                name:'cmser',
                message:'后端：'
            }]
        }
    },
    'm-special': {
        'info': 'create a new special',
        'config': {
            'type': 'github',
            'repos': 'snail-team/m-special',
            'prompt': [{
                type:   'input',
                name:   'frontEnd',
                message:'前端：'
            },{
                type:'input',
                name:'designer',
                message:'设计：'
            },{
                type:'input',
                name:'cmser',
                message:'后端'
            }]
        }
    },
    'page': {
        'info': 'create a new page',
        'config': {
            'type': 'github',
            'repos': 'template/page',
            'path': '/page',
            'prompt': [{
                type:   'input',
                name:   'frontEnd',
                message:'前端：'
            },{
                type:'input',
                name:'designer',
                message:'设计：'
            },{
                type:'input',
                name:'cmser',
                message:'后端：'
            }]
        }
    }
};