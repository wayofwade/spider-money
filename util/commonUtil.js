/**
 * @Description:
 * @params:
 * @return:
 * Created by chencc on 2019/1/26.
 */

const commonUtil = {

  /*
  * 下载的方法，传url
  * 下载文件的。paths为本地文件的路径，其实程序的路径指向已经在这个路径下面了，所以不用paths也没事
  * */
  downloadUrl: function (Url, paths, picName) {
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
  }
}
export default commonUtil