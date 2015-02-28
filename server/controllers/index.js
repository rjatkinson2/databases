var models = require('../models');
var bluebird = require('bluebird');



module.exports = {
  messages: {
    get: function (req, res) {
      console.log('hey we got here');
      models.messages.get(function(err, rows, columns){
        //gets the data somehow by passing it into callback
        console.log(rows);
        res.json(rows);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var message = req.body;
      models.messages.post(message, function (err, rows, columns) {
        console.log(err, rows);
        res.end('good job cURL!');
      });

    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

