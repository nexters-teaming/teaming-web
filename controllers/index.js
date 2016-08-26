/**
 * Created by YS on 2016-07-28.
 */
var main = require('./main');
var team = require('./team');
var section = require('./section');
var board = require('./board');
var user = require('./user');

var api = {
    main : main.login,
    team : team,
    section : section,
    board: board.test,
    user: user.login,

};

module.exports = api;