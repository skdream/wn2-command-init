module.exports = {
    'site': {
        'info': 'create a home site',
        'config': {
            'type': 'github',
            'repos': 'snail-team/wn-site-template',
            'prompt': [{
                type:   'input',               // input, confirm, list, rawlist, password
                name:   'frontEnd',               // (String) The name to use when storing the answer in the anwers hash
                message:'请输入前端开发人员昵称'             // The question to print

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
                name: 'project_name',
                description: 'Enter your project name',
                type: 'string',
                required: true,
                'default': 'yog'
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
            'repos': 'snail-team/special',
            'needApp': true,
            'path': '/widget',
            'allowCustom': true,
            'customPath': 'yog2_template',
            'prompt': [{
                name: 'widget_name',
                description: 'Enter your widget name (eg. header or book/list)',
                type: 'string',
                required: true
            }],
            'property': [{
                name: 'file_name',
                from: 'widget_name',
                calc: function (widget_name) {
                    return widget_name.split('/').pop();
                }
            }, {
                name: 'upper-file_name',
                from: 'file_name',
                calc: function (file_name) {
                    return file_name.replace(/^(\w)/, function (v) {
                        return v.toUpperCase();
                    });
                }
            }],
            'roadmap': [{
                reg: /(.*)(\$\{widget_name\})(.*)/,
                release: '/client/widget/${widget_name}/${file_name}$3'
            }]
        }
    },
    'm-special': {
        'info': 'create a new special',
        'config': {
            'type': 'github',
            'repos': 'snail-team/m-special',
            'needApp': true,
            'path': '/page',
            'allowCustom': true,
            'customPath': 'yog2_template',
            'prompt': [{
                name: 'page_name',
                description: 'Enter your page url path',
                type: 'string',
                required: true,
                'default': '/book/detail'
            }, {
                name: 'ral_name',
                description: 'Enter main ral service name',
                type: 'string',
                required: true,
                'default': 'BACKEND'
            }],
            'property': [{
                name: 'file_name',
                from: 'page_name',
                calc: function (page_name) {
                    return page_name.split('/').pop();
                }
            }, {
                name: 'upper-file_name',
                from: 'file_name',
                calc: function (file_name) {
                    return file_name.replace(/^(\w)/, function (v) {
                        return v.toUpperCase();
                    });
                }
            }],
            'roadmap': [{
                reg: /(.*)(\$\{page_name\})(.*)/,
                release: '/$1/${page_name}$3'
            }, {
                reg: '**',
                release: '/$&'
            }]
        }
    },
    'page': {
        'info': 'create a new page',
        'config': {
            'type': 'github',
            'repos': 'snail-team/m-special',
            'needApp': true,
            'path': '/page',
            'allowCustom': true,
            'customPath': 'yog2_template',
            'prompt': [{
                name: 'page_name',
                description: 'Enter your page url path',
                type: 'string',
                required: true,
                'default': '/book/detail'
            }, {
                name: 'ral_name',
                description: 'Enter main ral service name',
                type: 'string',
                required: true,
                'default': 'BACKEND'
            }],
            'property': [{
                name: 'file_name',
                from: 'page_name',
                calc: function (page_name) {
                    return page_name.split('/').pop();
                }
            }, {
                name: 'upper-file_name',
                from: 'file_name',
                calc: function (file_name) {
                    return file_name.replace(/^(\w)/, function (v) {
                        return v.toUpperCase();
                    });
                }
            }],
            'roadmap': [{
                reg: /(.*)(\$\{page_name\})(.*)/,
                release: '/$1/${page_name}$3'
            }, {
                reg: '**',
                release: '/$&'
            }]
        }
    }
};