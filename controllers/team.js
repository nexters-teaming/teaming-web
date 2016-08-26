/**
 * Created by YS on 2016-08-20.
 */
var request = require('request');
var credentials = require('../credentials.js');
var host = "";
if (process.env.NODE_ENV == "development") host = credentials.host.dev;
else host = credentials.host.api;

module.exports = {
    team_list : function(req, res, next) {
        var data = {
            access_token: req.signedCookies.access_token,
        };
console.log(data);
        request.get({
            url : host + "/team",
            headers : {
                'access-token' : data.access_token
            },
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

            res.render('team_list/team', {team_list: JSON.parse(body).data})
        });
    },

    create_team : function(req, res, next) {
        var data = {
            access_token: req.signedCookies.access_token,
            teamname: req.body.team_name,
            description: req.body.team_,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            section_count: req.body.section_count,
        };
        console.log(data);

        request.post({
            url : host + "/team",
            headers : {
                'access-token' : data.access_token
            },
            form: data
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

            res.statusCode = 303;
            res.redirect('/teams');
        });
    }
};