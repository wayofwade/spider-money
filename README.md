# spider-money


- 对天天基金进行爬虫，筛选出优秀的基金
- 前端可以提供筛选基金条件搜索



#### 安装依赖以及运行代码
- npm install 安装依赖

- npm run start 启动服务

- 浏览器运行端口: http://localhost:3000/


#### 代码运行过程（以猫眼电影为例子）
- 前端点击猫眼电影的按钮
- 进入request.js运行goCatMovie放方法
- 运行getUrl方法，运行spider.js里面的路由/catMovie
- 运行controller层，相对应的controller运行方法spiderMaoyanController进行爬虫