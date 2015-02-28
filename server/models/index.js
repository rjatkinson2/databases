var db = require('../db');




module.exports = {
  messages: {
    get: function (callback) {
      db.query('select * from messages',function(err, rows, column){
        callback(err, rows, column);
      });
    }, // a function which produces all the messages
    post: function () {} // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

