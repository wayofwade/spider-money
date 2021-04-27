const express = require('express');
const router = express.Router();
const spiderController = require('../controllers/SpiderController.js')
const spiderMaoyanController = require('../controllers/CatMovieController.js')
const CookEggController = require('../controllers/CookEggController.js')
const EZVIZController = require('../controllers/EZVIZController.js')


/*
 * 虎扑图片的路由
 */
router.get('/hupu', async function(req, res, next) {
  spiderController.getSpiderHupu(); // 爬虫的方法
  let hello = '爬虫虎扑爆照区'
  let title = '爬虫啊哈哈哈title'
  res.render('index', { title: title,username:hello });
});


/*
* 猫眼电影的路由
* */
router.get('/catMovie', async function(req, res, next) {
  spiderMaoyanController.getCatMovie(); // 爬虫的方法
  let hello = '爬虫猫眼电影'
  let title = '图片下载路径为/Users/chencongcong/Download/'
  console.log('到这里了spider.js文件里')
  res.send({ title: title,username:hello });
})


/*
 * 煎蛋图片的路由
 * */
router.get('/cookEgg', async function(req, res, next) {
  CookEggController.getCookEgg(); // 爬虫的方法
  let hello = '爬虫猫眼电影'
  let title = '图片下载路径为/Users/chencc/catMovieDownload/'
  console.log('到这里了')
  res.send({ title: title,username:hello });
})

router.get('/good', function(req, res, next) {
    /*
     routes层调用controller层方法
     */
  res.render('index', { title: '测试',username:'德玛西亚2222' });
});


router.get('/ezviz', function(req, res, next) {
  /*
   routes层调用controller层方法
   */
    EZVIZController.getEzvizData();
});

module.exports = router;
