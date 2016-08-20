/**
 * Created by YS on 2016-08-20.
 */
var request = require('request');
var credentials = require('../credentials.js');
var host = "";
if (process.env.NODE_ENV == "development") host = credentials.host.dev;
else host = credentials.host.api;

module.exports = {
    test : function(req, res, next) {
        var data = {
            section_id : req.params.section_id
        };

        request.get({
            url : host + "/section/"+data.section_id,
            headers : {
                'access-token' : 'test'
            }
        }, function(err, httpResponse, body) {
            if (err) {
                var error = new Error("API 서버 연결 실패");
                error.status = 404;
                console.error(err);
                return next(error);
            } else if (httpResponse.statusCode >= 300) {
                var error = new Error(JSON.parse(body).msg);
                error.status = httpResponse.statusCode;
                console.error(error.msg);
                return next(error);
            }
            var response = JSON.parse(body);
            console.log(response.data);
            res.render('index', {title: response.data});
        });
    }
};