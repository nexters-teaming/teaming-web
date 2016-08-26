/**
 * Created by YS on 2016-08-26.
 */
var request = require('request');
var credentials = require('../credentials.js');
var async = require('async');
var host = "";
if (process.env.NODE_ENV == "development") host = credentials.host.dev;
else host = credentials.host.api;

module.exports = {
    section_list : function(req, res, next) {
        var data = {
            access_token: req.signedCookies.access_token,
            team_id: req.params.team_id,
        };

        async.waterfall([
                function(callback) {
                    // 팀 상세 가져옴
                    request.get({
                        url : host + "/team/"+data.team_id,
                        headers : {
                            'access-token' : data.access_token
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

                        var start_date = new Date();
                        var end_date = new Date("2016-08-24");
                        if (end_date > start_date) {
                            var d_day = -new Date(end_date - start_date).getDate();
                        } else {
                            var d_day = new Date(start_date - end_date).getDate();
                        }
                        response.data.d_day = d_day;

                        var context = {team_detail: response.data};
                        callback(null, context);
                    });
                },
                function(context, callback) {
                    // 섹션 목록 가져옴
                    request.get({
                        url : host + "/section/"+data.team_id,
                        headers : {
                            'access-token' : data.access_token
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
                        context.section_list = response.data;
                        callback(null, context);
                    });
                },
                function(context, callback) {
                    // 섹션 상세 가져옴
                    if (context.section_list.length == 0)
                        return callback({state:0, msg:"no-content"}, context);
                    request.get({
                        url : host + "/section/" + data.team_id +"/"+ context.section_list[0].section_id,
                        headers : {
                            'access-token' : data.access_token
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
                        context.section_detail = response.data;
                        callback(null, context);
                    });
                }, function(context, callback) {
                    // 섹션별 할일 목록 가져옴
                    request.get({
                        url : host + "/work/"+data.team_id+"/"+data.section_id,
                        headers : {
                            'access-token' : data.access_token
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
                        context.work_list = response.data;
                        callback(null, context);
                    });
                }],
            function(err, result) {
                if (err.state !=0) {
                    if (err) console.log(err);
                }

                res.render('section_main/section', result)
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
            console.log(body);
            var team_list = [];
            team_list.push(JSON.parse(body).data);
            res.render('team_list/team', {team_list: team_list})
        });
    }
};