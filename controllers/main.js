/**
 * Created by YS on 2016-08-20.
 */
var request = require('request');
var credentials = require('../credentials.js');

var main = {
    login : function() {
        request.get(credentials.api_server + "/");
    }
};

module.exports = main;