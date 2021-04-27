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
const os = require('os');
const async = require('async');
const path = require('path')
const {resolve} = require('path')
let downLoadUrl = '/Users/chencc/catMovieDownload/' // 基本的路径-mac的
const catMovieUrl = 'https://maoyan.com/films?showType=3&offset=' // showType=3经典影片，2-即将上映 1-正在热播。。catId=影片类型
let urlFileName = '/Users/chencc/catMovieDownload/catMovie.json' // url下载路径文件


// let module;
module.exports = {
  test: function () {
    return "hello world async await";
  },
  downloadUrl: function (Url, paths, picName) { // 下载文件的方法
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
  getCatMovie:function () {
      console.log('当前的__dirname : ' + __dirname)
    // 判断是linux还是windows环境
      if (os.type() == 'Windows_NT') {
          //windows
          downLoadUrl = 'E:\\coder\\catMovieDownload'
          urlFileName = 'E:\\coder\\catMovieDownload\\catMovie.json'
      } else if (os.type() == 'Darwin') {
          //mac
      } else if (os.type() == 'Linux') {
          //Linux
      } else{
          //不支持提示
      }

    let catMovieUrls = '' // showType=地区，catId=类型
    for (let j = 1; j < 10; j++) {
      catMovieUrls = catMovieUrl + j * 30
      console.log('请求的url=', catMovieUrls)
      this.requestCatMovie(catMovieUrls)
    }
  },
  /**
   * 请求url并把找出图片url以及图片对应的title
   * @param catMovieUrls
   */
  requestCatMovie: function(catMovieUrls) {
    let that = this
    superagent.get(catMovieUrls).end(function (err, res) {
      if (err) {
        return console.error(err);
      }
      let $ = cheerio.load(res.text);
      console.log(res.text)


      let list = []
      let picList = []
      let titleList = []
      for (let k = 0; k < 5; k ++) {

        let picDiv = '.movies-panel .movies-list d1 dd:nth-child(' + (k + 1) + ') .movie-item a .movie-poster img'
        let titleDiv = '.movies-panel .movies-list d1 dd:nth-child(' + (k + 1) + ') .movie-item-title a'
        let imgDivLists = $(picDiv) // 按照顺序查找节点，返回list
        let titleDivLists = $(titleDiv) // 按照顺序查找节点，返回list


          // console.log('imgDivLists----', imgDivLists.length)
          // console.log('titleDivLists----', titleDivLists.length)
        imgDivLists.each(function(k,v){
          let src = $(v).attr("src");
          let srcs = $(v).attr("data-src");
          list.push(src);
          if (srcs) { // data-src没有的话就会undefined
            picList.push(srcs);
          }
        })
        titleDivLists.each(function(k,v){ // 获取title
          let title = $(v).text() // 这个方法是获取文本的
          titleList.push(title)
        })
      }
      fs.exists(downLoadUrl, function(exists) {
        console.log(exists ? "创建成功" : "创建失败");
        if (!exists) {
          //2. fs.mkdir  创建目录
          fs.mkdir(downLoadUrl,function(error){
            if(error){
              return false;
            }
            console.log('创建目录成功');
          })
        }
      });
      fs.exists(downLoadUrl, function(exists) {
        if (!exists) {
          console.log('没有的')
          fs.createWriteStream(urlFileName)
        }
        console.log('有的', JSON.stringify(picList))
        console.log('有的titleList', JSON.stringify(titleList))
        console.log('0----list', JSON.stringify(list))
        picList.forEach((v, k) => {
          //通过fs模块把数据写入本地json
          fs.appendFile(urlFileName, JSON.stringify(v) ,'utf-8', function (err) {
            if(err) throw new Error("appendFile failed...");
          });
        })
      })
      titleList.forEach((v, k) => {
        //定义一个以title为文件夹名的路径，作为以后下载图片时使用
        let picName = downLoadUrl + v + '-' + (new Date()).getTime() +'.jpg' // 时间戳命名防止重复
        fs.exists(downLoadUrl,function (exists) {
          if(!exists){
            console.log('不存在目录的时候')
            setTimeout(function(){ //downloadPic方法下载图片
              that.downloadUrl(picList[k], downLoadUrl, picName)
            },400)
          }else {
            console.log('存在目录的时候')
            that.downloadUrl(picList[k], downLoadUrl, picName)
          }
        })
      })
    })
  }
}