/**
 * Created by YS on 2016-08-25.
 */
var request = require('request');
var credentials = require('../credentials.js');
var host = "";
if (process.env.NODE_ENV == "development") host = credentials.host.dev;
else host = credentials.host.api;

module.exports = {
    login : function(req, res, next) {
        var data = {
            access_token: req.header('access-token'),
            user_id: req.body.user_id,
            username: req.body.username,
            email: req.body.email,
            user_picture: req.body.user_picture
        };
        console.log(data);

        request.post({
            url : host + "/users/oauth",
            headers : {
                'access-token' : data.access_token
            },
            form : {
                user_id: data.user_id,
                username: data.username,
                email: data.email,
                user_picture: data.user_picture
            }
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
            res.cookie('access_token', data.access_token,{ expires: new Date(Date.now() + 90000000), httpOnly: true ,signed:true});
            res.json({redirect_url: "/teams"});
        });
    }
};