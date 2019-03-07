var mysql      = require('mysql');
var pool  = mysql.createPool({
    host      : 'localhost',
    user      : 'root', 
    password  : 'root',
    port      : 3333,//家用笔记本
    port      : 3306,//单位
    password  : '123456',
    database  : 'mall',
});
var query=function(sql){
  console.log(sql)
    return new Promise((res)=>{
        pool.getConnection(function(err,conn){
            if(err){
                callback(err,null,null);
            }else{
                conn.query(sql,function(qerr,vals,fields){
                    //释放连接
                    // console.log(vals)
                    conn.release();
                    res(vals)
                });
            }
        });
    })  
};


  module.exports= query

