var db = require('../db');

var insertMessage = function (message, callback) {
  var fields = '(text, id_users, id_rooms) ';
  var userIdLookup = '(SELECT id from users where username = ' + message.username + ')';
  // var roomIdLookup = '(SELECT id from rooms where roomname = ' + message.roomname + ')';
  var values = 'values (' + [message.text, userIdLookup, message.roomId].join(' , ') + ')';

  db.query('insert into messages ' + fields + values, function (err, result, column) {
    callback(err, result, column);
  });

};

module.exports = {
  messages: {
    get: function (callback) {
      db.query('select t1.text, t2.username, t3.roomname from messages as t1 join users as t2 on t1.id_users = t2.id join rooms as t3 on t1.id_rooms = t3.id;',function(err, rows, column){
        callback(err, rows, column);
      });
    }, // a function which produces all the messages
    post: function (message, callback) {
      for (var k in message) {
        message[k] = db.escape(message[k]);
      }

      //does room exist?
      module.exports.rooms.get(message.roomname, function (err, rows) {

        if (rows.length === 0) {
          //add room to table, then store message
          module.exports.rooms.post(message.roomname, function (err, result) {
            message.roomId = result.insertId;
            insertMessage(message, callback);
          });
        } else {
          //store message with room id
          message.roomId = rows[0].id;
          insertMessage(message, callback);
        }
      });
    }
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.query('select * from users', function(err, rows, column){
        callback(err, rows, column);
      });
    },
    post: function (user, callback) {
      db.query('insert into users (username) values (' + user.username + ')', function(err, result){
        callback(err, result);
      });
    }
  },

  rooms: {
    get: function (roomname, callback) {
      var queryString = 'select * from rooms';
      if (roomname) {
        queryString += ' where roomname = ' + roomname;
      }
      console.log(queryString);
      db.query(queryString, function (err, rows) {
        callback(err, rows);
      });
    },
    post: function (roomname, callback) {
      db.query('insert into rooms (roomname) values (' + roomname + ')', function (err, result) {
        callback(err, result);
      });
    }
  }
};


