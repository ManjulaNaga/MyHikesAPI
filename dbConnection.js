'user strict';
var mysql = require('mysql');
var pool = mysql.createPool({
  host : "localhost",
  user  : "root",
  password  : "manju",
  database  : "myhikesDB",
  port: 3307
});
module.exports = pool;
//connection.getConnection();
