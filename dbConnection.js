'user strict';
var mysql = require('mysql');
var connection = mysql.createPool({
  host : "localhost",
  user  : "root",
  password  : "manju",
  database  : "myhikesDB",
  port: 3307
});
module.exports = connection;
//connection.getConnection();
