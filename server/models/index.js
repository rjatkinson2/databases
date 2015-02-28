var db = require('../db');


module.exports = {
  messages: {
    get: function (callback) {
      db.query('select * from messages',function(err, rows, column){
        callback(err, rows, column);
      });
    }, // a function which produces all the messages
    post: function (message, callback) {
      for (var k in message) {
        message[k] = db.escape(message[k]);
      }

      var fields = '(text, id_users, id_rooms) ';
      var userIdLookup = '(SELECT id from users where username = ' + message.username + ')';
      var roomIdLookup = '(SELECT id from rooms where roomname = ' + message.roomname + ')';
      var values = 'values (' + [message.text, userIdLookup, roomIdLookup].join(' , ') + ')';

      db.query('insert into messages ' + fields + values, function (err, rows, column) {
        callback(err, rows, column);
      });
    } //a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

