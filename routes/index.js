var express = require('express');
var router = express.Router();
var url = require("url");
// import user from './users.js'

/* 主页面. */
router.get('/', function(req, res, next) {
  console.log('测试3000端口的')
  res.render('index', { title: 'node爬虫项目' });
});


/*路由test的时候，渲染index.jade,返回title=测试的字段*/
router.get('/test', function(req, res, next) {
  let pathname = url.parse(req.url);
  let good = "好的";
  hello(good)
  res.render('index', { title: '测试',username:'德玛西亚' });
});

/* 
function printHello(){
   console.log( "Hello, World!");
}
// 两秒后执行以上函数
setTimeout(printHello, 2000);
*/

router.get('/test2', function(req, res, next) {
  var pathname = url.parse(req.url);
  console.log(pathname.path);
  function printHello(){
    console.log( "Hello, World!");
 }
 console.warn('警告警告');
 
 // 两秒后执行以上函数
 let t1 = setTimeout(printHello, 5000);
 let t2 = setTimeout(printHello, 5000); // 5s后也会打印
 // 两秒后执行以上函数
setInterval(printHello, 4000);
 // 两秒后执行以上函数
var t = setTimeout(printHello, 2000);

// 清除定时器
clearTimeout(t);
clearTimeout(t1);
  res.render('index', { title: '测试',username:'德玛西亚' });
});

function hello (good) {
  console.log(good);
  console.log(good);
};

module.exports = router;
