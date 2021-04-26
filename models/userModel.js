var mysql = require( 'mysql');  //导入mysql模块

module.exports = {
    
    addUser: async function () {
        var connection = mysql.createConnection({   //配置连接参数
            host : 'localhost',
            user : 'root',
            password : 'Admin123***',
            database : 'chencc_blog'
      });
      connection.connect();     //连接
      await connectToMysql();
      
      var addSql = 'INSERT INTO node_users (id,name,password) VALUES(?,?,?)';
      var addSqlParams = ["2","小华","15"];
      
      connection.query(addSql,addSqlParams, function(err, results, fields) {
                   if (err) {
                            console.log(err);
                    }else{
                            console.log(results);
                     }
      })
    
    },
    updateUser:function () {
        var updateSql = 'UPDATE node_users set name= ? where id = ?';
        var updateParams = ['无敌eee强','2'];

        connection.query(updateSql,updateParams,function(err,result){
                    if(err){
                            console.log('[UPDATE ERROR] '+ err.message)
                    }else{
                        console.log(`------------------------------------UPDATE-------------------`);
                        console.log(`UPDATE SUCCESS `+ result.affectedRows);        //成功影响了x行  1
                        console.log(`-------------------------------------------------------------`);
            }
        })
    },
    getUsers: function () {
        connection.query( 'SELECT * FROM node_users', function(err, results, fields) {
            if (err) {
                   console.log(err);
             }else{
                   console.log(results);
             }
        })
    },
    connectToMysql: function () {
    }
}
