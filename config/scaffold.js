module.exports = {
    'woniu':{
        'site': {
            'info': 'create a home site',
            'config': {
                'type': 'gitlab',
                'repos': 'template/site-template',
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
                'type': 'gitlab',
                'repos': 'template/m-site',
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
                'type': 'gitlab',
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
                'type': 'gitlab',
                'repos': 'template/m-special',
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
                'type': 'gitlab',
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
    },
    'snail':{
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
            'm-mobile':{
                'info': 'create a new m mobile site page',
                'config': {
                    'type': 'gitlab',
                    'repos': 'template/m-mobile'
                }
            },
            'mobile':{
                'info': 'create a new pc mobile site page',
                'config': {
                    'type': 'gitlab',
                    'repos': 'template/mobile'
                }
            }
            
    }

};