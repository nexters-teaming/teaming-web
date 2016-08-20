/**
 * Created by YS on 2016-07-28.
 */
var express = require('express');
var api = require('../controllers');
var router = express.Router();

module.exports = function(){

    // User controller
    router.get('/main', api.main);        // 메인 페이지
    router.get('/teams', api.team);             // 팀목록 페이지
    router.get('/boards/:section_id', api.board);           // 섹션 목록 페이지

    return router;
};

