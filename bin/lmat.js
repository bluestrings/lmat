#!/usr/bin/env node
// vi lmat/bin/lmat.js
var Liftoff = require('liftoff');
var argv = require('minimist')(process.argv.slice(2));
var path = require('path');
var cli = new Liftoff({
    name: 'lmat', // 命令名字
    processTitle: 'lmat',
    moduleName: 'lmat',
    configName: 'fis-conf',

    // only js supported!
    extensions: {
        '.js': null
    }
});

cli.launch({
    cwd: argv.r || argv.root,
    configPath: argv.f || argv.file
}, function(env) {
    var fis;
    if (!env.modulePath) {
        fis = require('../');
    } else {
        fis = require(env.modulePath);
    }
    fis.set('system.localNPMFolder', path.join(env.cwd, 'node_modules/lmat'));
    fis.set('system.globalNPMFolder', path.dirname(__dirname));
    fis.cli.run(argv, env);
});
