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
        request.get({
            url : host + "/",
            'access-token' : 'test'
        }, function(err,httpResponse,body){
            if (err) {
                var error = new Error("서버연결 실패");
                error.status = 500;
                console.error(err);
                return next(error);
            } else if(httpResponse.statusCode >= 400) {
                var error = new Error("데이터 가져오는중에 문제가 생겼습니다");
                error.status = 500;
                console.error(httpResponse.body);
                return next(error);
            }

            res.statusCode = 200;
            res.render('index', {title: '테스트', host: credentials.host.web, api: credentials.host.api});
        });
    }
};