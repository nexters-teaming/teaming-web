/**
 * Created by YS on 2016-07-28.
 */
var express = require('express');
var api = require('../controllers');
var router = express.Router();

module.exports = function(){

    // User controller
    router.get('/main', api.user.getMe);        // 메인 화면
    router.get('/teams', api.team.getTeam);     // 팀 목록
    router.get('/boards', api.board.getBoard);  // 섹션별 목록

    return router;
};

