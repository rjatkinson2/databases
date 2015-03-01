// var models = require('../models');
var bluebird = require('bluebird');
var models = require('../db');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.findAll()
        .complete(function (err, results) {
          res.json(results);
        });
      //       console.log('hey we got here');
      // models.messages.get(function(err, rows, columns){
      //   //gets the data somehow by passing it into callback
      //   console.log(rows);
      //   res.json(rows);
      // });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.users.findOrCreate({where:{ username: req.body.username }})
        .complete(function (err, users) {
          models.rooms.findOrCreate({where:{ roomname: req.body.roomname }})
            .complete(function (err, rooms) {
              console.log('users', users)
              console.log('rooms', rooms)
              models.messages.create({
                text: req.body.text,
                UserId: users[0].dataValues.id,//wrong
                RoomId: rooms[0].dataValues.id
              })
              .complete(function(err, result){
                res.status(201).end();
              });
            });
        });
      // var message = req.body;
      // models.messages.post(message, function (err, result, columns) {
      //   console.log(err, result);
      //   res.end('good job cURL!');
      // });
    }
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.findAll()
        .complete(function(err, users){
          res.json(users);
        });

      // models.users.get(function(err, rows, columns){
      //   console.log(rows);
      //   res.json(rows);
      // });
    },
    post: function (req, res) {
      models.users.create({username: req.body.username})
        .complete(function(err, result){
          res.status(201).end();
        });

      // models.users.post(req.body, function(err, result){
      //   console.log(err, result);
      //   res.end('sweet cURLing');
      // });
    }
  },

  rooms: {
    get: function (req, res) {
      models.rooms.findAll()
        .complete(function(err, rooms){
          res.json(rooms);
        });

      // models.rooms.get(undefined, function (err, rows) {
      //   res.write('nicely done cURL!');
      //   res.end(JSON.stringify(rows));
      // });
    },
    post: function (req, res) {
      models.rooms.create({roomname: req.body.roomname})
        .complete(function(err, result){
          res.status(201).end();
        });
    }
  }
};
