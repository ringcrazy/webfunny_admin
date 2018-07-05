/*
 * modukle.js
 * fishYu 
 *
 * 创建新模块
 */

"use strict";

var path = require('path');
var fs = require('fs');


//正则+replace  实现首字母大写
function titleCase(s) {
    return s.replace(/\b([\w|']+)\b/g, function (word) {
        return word.replace(word.charAt(0), word.charAt(0).toUpperCase());
    });
}

/**
 * 创建目录
 * @param {string} url 目录路径
 * @param {function} callBack 回调函数
 */
function createDir(url, callBack) {
    fs.mkdir(__dirname + url, function (err) {
        if (err) {
            throw err;
        } else {
            callBack && callBack();
            console.log('创建目录成功');
        }
    });
}
/**
 * 创建文件
 * @param {string} fileName 文件路径
 * @param {string} data 文件内容
 */
function createFile(fileName, data) {
    var ws = fs.createWriteStream(__dirname + fileName, { start: 0 });
    var temp = data.replace(/\{0\}/g, CompName).replace(/\{1\}/g, modlueName);
    var buffer = new Buffer(temp);
    ws.write(buffer, 'utf8', function (err, buffer) {
        if (err) {
            throw err;
        } else {
            console.log('创建文件成功');
        }
    });
}
/**
 * 创建具体模块
 * @param {string} name 模块名称
 * @param {function} callBack 回调函数
 */
function createModule(name, callBack) {
    var componentsUrl = "/src/modules/" + name;
    var containerUrl = "/src/containers/";
    //创建模块 components
    createDir(componentsUrl, function () {
        //创建 container index.js
        var containerTemp = fs.readFileSync(__dirname + '/src/templates/container.js.template', 'utf8');
        createFile(containerUrl + "/"+name+".js", containerTemp);
        //创建 component index.js
        var compTemp = fs.readFileSync(__dirname + '/src/templates/component.js.template', 'utf8');
        createFile(componentsUrl + "/index.js", compTemp);
        //创建 component index.scss
        var scssTemp = fs.readFileSync(__dirname + '/src/templates/index.scss.template', 'utf8');
        createFile(componentsUrl + "/index.scss", scssTemp);
        //创建 action.js
        var actionTemp = fs.readFileSync(__dirname + '/src/templates/action.js.template', 'utf8');
        createFile(componentsUrl + "/action.js", actionTemp);
        //创建 reducer.js
        var reducerTemp = fs.readFileSync(__dirname + '/src/templates/reducer.js.template', 'utf8');
        createFile(componentsUrl + "/reducer.js", reducerTemp);
        //成功回调
        callBack && callBack();
    });
}


/**
 * 更新reducers聚合文件
 * @param {string} content 需要更新的内容
 * *@param {function} callBack 成功回调
 */
function updateReducers(content, callBack) {
    fs.open(__dirname + '/src/reducers.js', 'w', function (err, fd) {
        if (err) {
            console.error('打开reducers聚合文件失败',err);
            fs.close(fd);
            return;
        } else {
            var buffer = new Buffer(content);
            //写入,写入总长，从起始位置写入
            fs.write(fd, buffer,0, buffer.length, 0, function (err, written, buffer) {
                fs.close(fd);
                if (err) {
                    console.log('更新reducers聚合文件失败', err);
                    return;
                } else {
                    console.log("更新reducers聚合文件 OK");
                    callBack && callBack();
                }
            });
        }
    });
}
/**
 * 在bandle load追加内容
 * @param {function} callBack 成功回调函数 
 */
function appendBundleLoad(callBack){
    var bundleLoadTemp = fs.readFileSync(__dirname + '/src/templates/bundleLoad.js.template', 'utf8');
    var data = bundleLoadTemp.replace(/\{0\}/g, CompName).replace(/\{1\}/g, modlueName);
    data = '\n' + data + '\n';
    var buffer = new Buffer(data);
    fs.appendFile(__dirname + '/src/bundle_load.js', buffer, function (err) {
        if (err) {
            console.error("追加 bandler load 失败",err);
            return;
        } else {
            callBack && callBack();
            console.log("追加 bandler load OK");
        }
    });
}

/**
 * 更新路由
 * @param {function} callBack  成功回调函数 
 */
function updateRouter(callBack) {
    var data = fs.readFileSync(__dirname + '/src/router.js', 'utf8');
    data = data.substr(0, data.lastIndexOf("]"));
    var routerTemp = fs.readFileSync(__dirname + '/src/templates/router.js.template', 'utf8');
    var router = routerTemp.replace(/\{0\}/g, CompName).replace(/\{1\}/g, modlueName);
    var buf = data + "\t" + router + "\n]"
    var buffer = new Buffer(buf);
    fs.writeFile(__dirname + '/src/router.js', buffer, function (err) {
        if (err) {
            console.error("追加 router 失败",err);
            return;
        } else {
            callBack && callBack();
            console.log("追加 router OK");
        }
    });
}
/**
 * 读取modules 模块目录，
 * @param {string} url 需要读取的目录路径
 * @param {function} callBack 回调函数
 */
function readDir(url, callBack) {
    fs.readdir(__dirname + url, function (err, files) {
        if (err) {
            console.log('读取目录失败', err);
            throw err;
        } else {
            console.log('读取目录成功');
            callBack && callBack(files);
        }
    })
}
/**
 * 拼接reducers内容  demo3: {reducer: demo3Reducer, isCached: false},
 * @param {array} files modules目录下的文件夹数组
 */
function jointReducersContent(files){
    console.log(files);
    var updateReducer = "";
    var reducerPath = "";
    var reducerContent = "export default {\n";
    var store = "";
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        if(file === '.DS_Store'){
            continue;
        }
        reducerPath += 'import ' + file + 'Reducer from "Modules/' + file + '/reducer"\n';
        store += "  " + file + ': {reducer: ' + file + 'Reducer, isCached: false},\n';
    }
    store = store.substr(0, store.lastIndexOf(','));
    updateReducer = reducerPath + '\n' + reducerContent  + store + "\n}";
    return updateReducer;
}

var index = 0;
//获取参数
var args = process.argv.splice(2);
var modlueName = args[index];  //模块名称
var CompName = titleCase(modlueName);  //组件名称 模块名称的首字母大写
/**
 * 递归循环创建 module
 */
function loopCreate () {
    if(index >= args.length) return;
    modlueName = args[index];  //模块名称
    CompName = titleCase(modlueName);  //组件名称 模块名称的首字母大写
    //创建模块 具体实现
    createModule(modlueName, function() {
        console.log('创建成功');
        //读取目录
        readDir("/src/modules/", function (files) {
            //更新reducers聚合
            updateReducers(jointReducersContent(files), function() {
                //追加bandle load
                appendBundleLoad(function() {
                    //更新路由
                    updateRouter(function(){
                        console.log("更新路由成功");
                        index++;
                        loopCreate();
                    });
                });
            });
        });
    });
}

/**
 * 递归创建
 */
loopCreate();

