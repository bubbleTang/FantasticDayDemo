'use strict';

let actions = {};
let user = require('./userAction');

Object.assign(
  actions,
  user
);

module.exports = actions;