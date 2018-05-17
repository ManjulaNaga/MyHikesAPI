'use strict';
module.exports = function(app){
  var hike = require('../../dbConnection');

  //hike routes
  app.route('/users')
    .get(hike.list_all_users)
    .post(hike.store_user_loginCred); //send data in body
  app.route('/userdelete')
    .post(hike.delete_user); //send username in body

    app.route('/userhikes')
      .get(hike.list_all_hikes_of_a_user) //send user name in header
      .post(hike.store_user_hike_metadata); //send user name in body
      //.post(hike.delete_user_hikes);
    app.route('/alluserhikes')
      .get(hike.list_all_hikes);
};
