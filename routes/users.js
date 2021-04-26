var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserController.js')



/* GET users listing.
   get方式接收
*/
router.get('/', async function(req, res, next) {
  // let hello = await userController.test();
  // let title = await userController.getTitle();
  userController.getSpider(); // 爬虫的方法
  console.log(next);
  // res.send('respond with a resource');
  res.render('index', { title: title,username:hello });
});

router.get('/good', function(req, res, next) {
  /*
  routes层调用controller层方法
  */
  userController.getSpider(); // 爬虫的方法
  res.render('index', { title: '测试',username:'德玛西亚2222' });
});

module.exports = router;
