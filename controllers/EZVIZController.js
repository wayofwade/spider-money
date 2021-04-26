/**
 * @Description: 萤石商城爬虫
 * @params:
 * @return:
 * Created by chencc on 2018/12/12.
 */
const superagent = require('superagent') // 轻量级的ajax API
const cheerio = require('cheerio');
const request = require('request')
const url = require('url');
const fs = require('fs');
const os = require('os');
const async = require('async');
const path = require('path')
let downLoadUrl = '/Users/chencc/catMovieDownload/' // 基本的路径-mac的
const catMovieUrl = 'https://www.ys7.com/search/index.html' // 萤石
let urlFileName = '/Users/chencc/catMovieDownload/catMovie.json' // url下载路径文件


module.exports = {

    /**
     * 下载文件的方法
     * @param Url
     * @param paths
     * @param picName
     */
  downloadUrl: function (Url, paths, picName) {
    let writeStream = fs.createWriteStream(picName);
    let readStream = request(Url) // 请求url获取图片
    readStream.pipe(writeStream); // 把图片传到本地

    console.log('图片Url=', Url, paths)
    readStream.on('end', function() {
      //console.log('文件下载成功');
    });
    readStream.on('error', function() {
      console.log("错误信息:" + err)
    })
    writeStream.on("finish", function() {
      //console.log("文件写入成功");
      writeStream.end();
    })
  },
    /**
     * 入口文件
     */
    getEzvizData:function () {
      console.log('当前的__dirname : ' + __dirname)
    // 判断是linux还是windows环境
      if (os.type() == 'Windows_NT') {
          //windows
          downLoadUrl = 'E:\\coder\\catMovieDownload\\'
          urlFileName = 'E:\\coder\\catMovieDownload\\catMovie.json'
      } else if (os.type() == 'Darwin') {
          //mac
      } else if (os.type() == 'Linux') {
          //Linux
      } else{
          //不支持提示
      }

    let catMovieUrls = '' // showType=地区，catId=类型
    for (let j = 1; j < 3; j++) {
      catMovieUrls = catMovieUrl + '?page=' + j + '&per-page=21'
      this.getEzvizHtml(catMovieUrls)
    }
  },
  /**
   * 请求url并把找出图片url以及图片对应的title
   * @param catMovieUrls
   */
  getEzvizHtml: function(catMovieUrls) {
    let that = this
    superagent.get(catMovieUrls).end(function (err, res) {
      if (err) {
        return console.error(err);
      }
      let $ = cheerio.load(res.text)

      let list = []
      let picList = []
      let titleList = []

      // 循环前16张图片
      for (let k = 0; k < 15; k ++) {
        let picDiv = '.product-list ul li:nth-child(' + (k + 1) + ') .product-figure a img'
        let titleDiv = 'hello' + new Date().toDateString()
        let imgDivLists = $(picDiv) // 按照顺序查找节点，返回list
        let titleDivLists = imgDivLists.map((item,index) => { return (String(Math.random()) + String(new Date().getTime())) })// $(titleDiv) // 按照顺序查找节点，返回list

        imgDivLists.each(function(k,v){
          let src = $(v).attr("src");
          if (src) {
            picList.push(src);
          }
        })
        titleDivLists.each(function(k,v){ // 获取title
          // let title = $(v).text() // 这个方法是获取文本的
          titleList.push(v)
        })
      }

      // 判断文件夹存不存在
      fs.exists(downLoadUrl, function(exists) {
        console.log(exists ? "创建成功" : "创建失败");
        if (!exists) {
          //2. fs.mkdir  创建目录
          fs.mkdir(downLoadUrl,function(error){
            if(error){
              return false;
            }
          })
        }
      });
      // 判断文件存不存在
      fs.exists(urlFileName, function(exists) {
        if (!exists) {
          console.log('没有的')
          fs.createWriteStream(urlFileName)
        }
        picList.forEach((v, k) => {
          //通过fs模块把数据写入本地json
          fs.appendFile(urlFileName, JSON.stringify(v) ,'utf-8', function (err) {
            if(err) throw new Error("appendFile failed...");
          });
        })
      })

        // 循环下载到本地
        titleList.forEach((v, k) => {
        //定义一个以title为文件夹名的路径，作为以后下载图片时使用
        let picName = downLoadUrl + v + '-' + (new Date()).getTime() +'.jpg' // 时间戳命名防止重复
        fs.exists(downLoadUrl,function (exists) {
          if(!exists){
            console.log('不存在目录的时候')
          }else {
            console.log('存在目录的时候')
            that.downloadUrl(picList[k], downLoadUrl, picName)
          }
        })
      })
    })
  }
}