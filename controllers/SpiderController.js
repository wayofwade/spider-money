/**
 * @Description:
 * @params:
 * @return:
 * Created by chencc on 2018/12/12.
 */
const superagent = require('superagent') // 轻量级的ajax API
const cheerio = require('cheerio');
const request = require('request')
const url = require('url');
const fs = require('fs');
const async = require('async');
const path = require('path')
let allUrl = [];
let curCount = 0;
let picObjList = []
const downLoadUrl = '/Users/chencc/spiderHupuDownload/' // 基本的路径
const urlFiles = downLoadUrl + 'urls.json'

module.exports = {
  test: function () {
    return "hello world async await";
  },
  downloadUrl: function (Url, paths, picName) { // 下载文件的
      let writeStream = fs.createWriteStream(picName);
      let readStream = request(Url) // 请求url获取图片
      readStream.pipe(writeStream); // 把图片传到本地
      readStream.on('end', function() {
        console.log('文件下载成功');
      });
      readStream.on('error', function() {
        console.log("错误信息:" + err)
      })
      writeStream.on("finish", function() {
        console.log("文件写入成功");
        writeStream.end();
      })
  },
  getSpiderHupu: function () { // 总入口文件
    let hupuURL = 'https://bbs.hupu.com/selfie' // 虎扑爆照区第一页。第二页是selfie-2，以此类推
    let hupuURLTwo = 'https://bbs.hupu.com/selfie-' // 虎扑爆照区第一页。第二页是selfie-2，以此类推
    for (let i = 1; i < 2; i++) {
      if (i === 1) {
        this.doRequest(hupuURL, i)
      } else {
        let urls = hupuURLTwo + i
        this.doRequest(urls, i)
      }
    }
  },
  doRequest (hupuURL, page) { // 发送请求开始爬虫
    let that = this
    superagent.get(hupuURL).end(function (err, res) {
      if (err) {
        return console.error(err);
      }
      let $ = cheerio.load(res.text);
      //获取首页所有的链接
      $('.titlelink>a:first-child').each(function (pageIndex, element) {
        let $element = $(element);
        console.log($element.attr('href'))
        let href = url.resolve(hupuURL, $element.attr('href')); // url+href=图片路径
        allUrl.push(href);
        console.log(href)
        curCount++ //获取到此url，异步进行以下操作，此操作为进入到这个帖子中爬取数据
        superagent.get(href).end(function (err, res) { // 请求href的内容
          if (err) {
            return console.error(err);
          }
          let $ = cheerio.load(res.text);
          let add = href;
          let title = $('.bbs-hd-h1>h1').attr('data-title');//帖子标题
          let tximg = $('.headpic:first-child>img').attr('src');//用户头像
          let txname = $('.j_u:first-child').attr('uname');//用户ID
          console.log('用户名字和用户id');
          console.log(title);
          console.log(txname);
          console.log(tximg);
          let contentimg1 = $('.quote-content>p:nth-child(1)>img').attr('src');//爆照图1
          let contentimg2 = $('.quote-content>p:nth-child(2)>img').attr('src');//爆照图2
          let contentimg3 = $('.quote-content>p:nth-child(3)>img').attr('src');//爆照图3
          let picObj = {
            title: '',
            name: '',
            picList: []
          }
          picObj.name = txname
          picObj.title = title
          let picArr = []; // 图片list
          if (contentimg1) {
            picObj.picList.push(contentimg1)
            picArr.push(contentimg1)
          }
          if (contentimg2) {
            picObj.picList.push(contentimg2)
            picArr.push(contentimg2)
          }
          if (contentimg3) {
            picObj.picList.push(contentimg3)
            picArr.push(contentimg3)
          }
          fs.exists(downLoadUrl, function(exists) { // 判断目录是不是存在
            console.log(exists ? "创建成功" : "创建失败");
            if (!exists) {
              //2. fs.mkdir  创建目录
              fs.mkdir(downLoadUrl,function(error){
                if(error){
                  console.log(error);
                  return false;
                }
                console.log('创建目录成功');
              })
            }
          });
          fs.exists(urlFiles, function(exists) { // 判断文件是不是存在
            if (!exists) {
              fs.createWriteStream(urlFiles)
            }
            //通过fs模块把数据写入本地json
            fs.appendFile(urlFiles, JSON.stringify(picObj) ,'utf-8', function (err) {
              if(err) throw new Error("appendFile failed...");
              console.log("数据写入success...");
            });
          })
          picObjList.push(picObj)
          //定义一个以title为文件夹名的路径，作为以后下载图片时使用
          let picName = downLoadUrl + '第' + page + '页' + title + '-' + (new Date()).getTime() +'.jpg' // 时间戳命名防止重复
          for (let i = 0; i < picArr.length; i++) {
            if (picArr[i]) {
              that.downloadUrl(picArr[i], downLoadUrl, picName)
            }
          }
        })
      })
    })
  }
}