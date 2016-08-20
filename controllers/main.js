/**
 * Created by YS on 2016-08-20.
 */
var request = require('request');
var credentials = require('../credentials.js');
var host = "";
if (process.env.NODE_ENV == "development") host = credentials.host.dev;
else host = credentials.host.api;

module.exports = {
    login : function(req, res, next) {
        console.log(host);
        request.get({
            url : host + "/",
            'access-token' : 'test'
        }, function(err,httpResponse,body){
            console.log(body);
            res.render('index', {title: '테스트'});
        });
    }
};