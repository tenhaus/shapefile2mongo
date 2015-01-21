#!/usr/bin/env node
'use strict';
var meow = require('meow');
var shapefile2mongo = require('./');

var cli = meow({
  help: [
    'Usage',
    '  shapefile2mongo <input>',
    '',
    'Example',
    '  shapefile2mongo Unicorn'
  ].join('\n')
});

shapefile2mongo(cli.input[0]);
