/*
爬虫百度页面
node spider
*/
var https = require('https');
var cheerio = require('cheerio');
var url = "https://book.douban.com"; //初始url
function fetchPage(url) { //封装了一层函数
    startRequest(url);
}
function startRequest(url) {
    //采用http模块向服务器发起一次get请求      
    https.get(url, function (res) { // http和https的区别
        console.log("helloooo")
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
            // aa += $('#su').text()//.html().trim();
            // console.log($('.rate').attr('value')) // 百度按钮的文字
            // console.log($('item'))
            // 根据id获取轮播图列表信息
            // var slideList = $('#app').find('.article').find('.list-wp')// $('#fruits').find('li').length
            var slideList = $(".cover").children('a').children('img')//.children('div')//.children('.article')//.children('.list-wp')//.filter(".list-wp")//.next().filter('.item').length//.children('.item')
             // var t = $('.article').children('div')
             console.log(slideList)
             console.log(slideList.length)
             // console.log(slideList[0].attr('url'))
            //let title = $('.bbs-hd-h1>h1').attr('data-title');//帖子标题
            // sconsole.log(slideList)
            // console.log(slideList.length)
            // console.log(slideList);
            slideList.find('img').each(function(item) {
                console.log(item.attr('src'))    //=> Pear)
            })
            // soutu-btn
            console.log(aa);
        });
    }).on('error', function (err) {
        console.log(err);
    });
}
fetchPage(url); //主程序开始运行