'user strict';
var mysql = require('mysql');
var connection = mysql.createPool({
  host : "localhost",
  user  : "root",
  password  : "manju",
  database  : "myhikesDB",
  port: 3307
});

//connection.getConnection();
exports.list_all_users = function(req,res){
  var sql = "select * from myhikesDB.users";
  connection.query(sql, function(err,rows,fields){
    if(!err)
    {
      console.log("users are  as follows");
      console.log(rows);// display all rows
      //res.send(rows);
      //console.log(fields);
    }
    else
    console.log("error while performing the query" +err);
    //close connection
    res.send(err);
    connection.end();
  });
};

exports.store_user_loginCred = function(req,res){
   res.header('Content-Type', 'application/x-www-form-urlencoded');
  var jsondata = req.body;
  var in_name = req.body.name;
  var in_pass = req.body.password;
  //var values = [];
  //for(var i=0;i<jsondata.length;i++)
  //  values.push([jsondata[i].name,jsondata[i].password]);
  var insertdata = [in_name,in_pass];
//bulk insert using nested array[[a,b],[c,d]] eill be flattened as (a,b),(c,d)
  var sql = "insert into myhikesDB.users (name,password) values (?);";
  var query = connection.query(sql,[insertdata],function(err,result){
    //var query = connection.query(sql,[values],function(err,result){
    if(!err)
    {
      console.log("row is inserted");
      res.send("sucessfully inserted 1 row");
    }
    else{
      console.log("error while performing the query" +err);
      res.send(err);
    }
    //close connection
    //connection.end();
  });
};

//get all hikes of a perticular user.
exports.list_all_hikes_of_a_user = function(req,res){
  //console.log("req.header:" + req.headers['name']);
  var in_name = req.headers.name;
  console.log("in_name:" + in_name);
  var sql = 'select * from myhikesDB.hikeinfo where user_name = ?';
  var query = connection.query(sql,[in_name],function(err,rows){
    if(err){
      console.log("error occured while getting hikes from the database. "+err);
      res.send(err);
    }
    else{
      console.log(rows);
      res.send(rows);
    }
    //close connection.
    connection.end();
  });
  console.log(query);
};
//get all hikes of all users.

exports.list_all_hikes = function(req,res){
  var sql = " select * from myhikesDB.hikeinfo;";
  var query = connection.query(sql,function(err,result){
    if(err){
      console.log("error ocoured while getting all hikes of all users.");
      res.send(err);
    }
    else{
      console.log(result);
      //res.send("sucessfully fetched all hikes of all users.");
      res.json(result);
    }
    //connection.end();
  });
};


//store user hike details
exports.store_user_hike_metadata = function(req,res){
  var in_name = req.headers.name;
  var in_hname = req.headers.hname;
  console.log(in_name);

  var mysql = "select id from myhikesDB.users where name = ? ;";
  var query = connection.query(mysql,[in_name],function(err,result){
    console.log(result);
  var userId = result[0].id;
    if(err)
    res.send("err which fetching user details");
    else if(userId == 0)
    res.send("row not exists");
    else {
      console.log("row exists");
      //var userId = result[0].id;
      /*console.log(userId);
      console.log(in_name);
      console.log(in_hname);
      console.log(userId);*/
      var insertdata = [userId,in_name,in_hname];
      //var insertdata = [userId,'vamsi','Maple falls'];
      var sql = "insert into myhikesDB.hikeinfo (user_id,user_name,hike_name,date_created,time_created) values (?,curdate(),curtime()); ";
      console.log(sql);
      var query = connection.query(sql,[insertdata],function(err,result){
        //var query = connection.query(sql,userId,function(err,result){
      if(err){
          console.log("error occured while storing hike details.");
          res.send(err);
      }
      else{
          console.log("inserted 1 row sucessfully");
          //res.send("sucessfully fetched all hikes of all users.");
          res.send(result);
      }
      connection.end();
      console.log(query);
      });
    }
});
};
//delete a user from the database
exports.delete_user = function(req,res){
  console.log("req"+req.body.name);
  var deletename = req.body.name;
  //check if user exists
  var sql2 = "select count(*) from myhikesDB.users where name = ? ;";
  var query2 = connection.query(sql2,[deletename],function(err,result){
    if(err){
      console.log("error ocoured while fetching the user."+err);
      res.send(err);
    }
    else if(result == 0){
      console.log("no user exists with username "+deletename);
    }
    else{
      console.log("users exists. Deleting the user ...");
      var sql = "delete from myhikesDB.users where name = ? ;";
      var query = connection.query(sql,[deletename],function(err,result){
          if(err){
            console.log("error ocoured while deleting the user.");
            res.send(err);
          }
          else{
            console.log("deleted"+results.affectedRows+" row sucessfully");
            res.json(result);
          }
          console.log(query);
          connection.end();
      }); //query closed.
    } //else part closed.
  }); //query2 closed.
  }; //delete_user() closed.
