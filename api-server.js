/*
 * dev-server.js
 * Copyright (C) 2016 tristan <tristan@tristan-VirtualBox>
 *
 * Distributed under terms of the MIT license.
 */
//
//"use strict";
//
//var express = require('express');
//var path = require('path');
//var fs = require('fs');
//var bodyParser = require('body-parser');
//var cors = require('cors');
//var app = express();
//
//var jsonFileBase = './mock';
//function isFunction(obj) {
//    return Object.prototype.toString.call(obj) == '[object Function]';
//}
//function route(fileName) {
//    return function(req, res) {
//        var fn = getMockJsonUrl(req.originalUrl);
//        var args = process.argv;
//        if (isFunction(fn)) fn = fn(req);
//        setTimeout(function() {
//            jsonFromFile(res, fn);
//        }, 500);
//    };
//}
//
//function getMockJsonUrl(url){
//    var p = path.join(jsonFileBase, url.split('?')[0]);   //增加前缀和去掉？后面的所有值
//    p += '.json';
//    return p;
//}
//
//function jsonFromFile(res, fileName) {
//    fs.readFile(fileName, {encoding:'utf8'}, function(err, data) {
//        if (err) {
//            console.log(err);
//            throw err;
//        }
//        res.json(JSON.parse(data));
//    });
//}
//function convertUrl (r){
//    var p = path.join(jsonFileBase, r.replace(/\/:[^\/]+(?=[\/$])/g, ''));
//    if (p[p.length - 1] == '/') p = p.substr(0, p.length - 1);
//    p += '.json';
//    return p;
//}
//
//function gets(router, routes) {
//    routes.forEach(function(r) {
//        var p = path.join(jsonFileBase, r.replace(/\/:[^\/]+(?=[\/$])/g, ''));
//        if (p[p.length - 1] == '/') p = p.substr(0, p.length - 1);
//        p += '.json';
//        router.use(r, route(p));
//    });
//}
//
//
//app.use(function(req, res, next) {
//	console.log(req.originalUrl);
//	next();
//});
//app.use(cors({
//    origin: '*',
//    exposedHeaders: 'access-token'
//}));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));
//var router = express.Router();
//app.use('/', router);
///**
// * get 方法
// */
////获取地理位置
//gets(router, [
//    '/superapp/rest/areas'
//]);
//
//// omega MOCK 接口
//gets(router, [
//    '/superapp/openAccountCenter/omega/application',
//    '/superapp/openAccountCenter/omega/application/:appId/preAuditResult'
//]);
//
//
//
//
//
///**
// * post 方法
// */
////提交联系人信息
//var clContact = '/clApplication/:appId/contact';
//router.post(clContact, function(req, res) {
//    jsonFromFile(res, getMockJsonUrl(req.originalUrl));
//});
//
//
//
//var server = app.listen(9011, function() {
//	var address = server.address();
//	console.log('api server is running at:' + address.port);
//});
//
//


/*
 * dev-server.js
 * Copyright (C) 2016 tristan <tristan@tristan-VirtualBox>
 *
 * Distributed under terms of the MIT license.
 */

"use strict";

var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

var jsonFileBase = './mock';
function isFunction(obj) {
    return Object.prototype.toString.call(obj) == '[object Function]';
}
function route(fileName) {
    return function(req, res) {
        console.log(req.body);
        var fn = fileName;
        var args = process.argv;
        if (isFunction(fn)) fn = fn(req);
        setTimeout(function() {
            jsonFromFile(res, fn);
        }, 500);
    };
}

function jsonFromFile(res, fileName) {
    fs.readFile(fileName, {encoding:'utf8'}, function(err, data) {
        if (err) {
            console.log(err);
            throw err;
        }
        res.json(JSON.parse(data));
    });
}

function gets(router, routes) {
    routes.forEach(function(r) {
        var p = path.join(jsonFileBase, r.replace(/\/:[^\/]+(?=[\/$])/g, ''));
        if (p[p.length - 1] == '/') p = p.substr(0, p.length - 1);
        p += '.json';
        router.use(r, route(p));
    });
}

app.use(function(req, res, next) {
    console.log(req.originalUrl);
    next();
});
app.use(cors({
    origin: '*',
    exposedHeaders: 'access-token'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var router = express.Router();
gets(router,
  [
    '/omega-customer-acquisition/customer/friends'
  ]);



router.post('/superapp/openAccountCenter/omega/userInfo/personalInfo', function(req, res) {
    console.log(req.body);
    res.json({
        "status": 0,
        "msg": "失败",
        "data": {
            "success":true,
            "reachMaxCount":false,
            "msg":"银行卡信息校验失败"
        }
    });
});


app.use('/', router);

var server = app.listen(9011, function() {
    var address = server.address();
    console.log('api server is running at:' + address.port);
});




