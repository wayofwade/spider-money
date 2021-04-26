var userModel= require('../models/userModel.js')
// const superagent = require('superagent') // 轻量级的ajax API
module.exports = {
    //增加
    save: function(item, next){
        console.log("item:",item);
        waterline.models.acl_user
            .create(item, next);
    },
    //修改
    update:function(param, next){
        console.log(">> param:",param);
        waterline.models.acl_user
            .update({id:param.id},param)
            .exec(next);
    },
    //查询全部新闻
    getList: function( param, next){
        console.log("param:",param);

        waterline.models.acl_user
            .find(param)
            .exec(next);

    },
    //查询数量
    count:function(param,next){

        waterline.models.acl_user
            .count(param)
            .exec(next);
    },
    test: function () {
        console.log("tttttttt");
        return "hello world async await";
    },
    getTitle: function () {
        userModel.addUser();
        return "title async await";
    },
    getSpider:function () {
      let http = require('http');
      let cheerio = require('cheerio');
      let hupuURL = 'https://bbs.hupu.com/selfie' // 虎扑爆照区第一页。第二页是selfie-2，以此类推
      let url = "http://www.baidu.com"; //初始url
      console.log('爬虫开启')
      fetchPage(url); //主程序开始运行
      function fetchPage(x) { //封装了一层函数
            startRequest(x);
        }
        function startRequest(x) {
            //采用http模块向服务器发起一次get请求      
            http.get(x, function (res) {
                var html = ''; //用来存储请求网页的整个html内容
                var titles = [];
                res.setEncoding('utf-8'); //防止中文乱码
                //监听data事件，每次取一块数据
                res.on('data', function (chunk) {
                    html += chunk;
                });
                //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
                res.on('end', function () {
                    // console.log(html)
                    var $ = cheerio.load(html, {decodeEntities: false}); 
                    //采用cheerio模块解析    html
                    var aa = "";
                aa += $('title').html().trim();
                    console.log(aa);
                });
            }).on('error', function (err) {
                console.log(err);
            });
        }
    }
};