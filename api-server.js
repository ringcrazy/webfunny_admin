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
    ''
  ]);



router.post('', function(req, res) {
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




