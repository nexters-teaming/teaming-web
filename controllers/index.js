/**
 * Created by YS on 2016-07-28.
 */
var main = require('./main');
var team = require('./team');
var board = require('./board');

var api = {
    main : main.login,
    team : team,
    board: board

};

module.exports = api;