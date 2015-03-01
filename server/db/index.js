var mysql = require('mysql');

var sequelize = require('sequelize');
var db = new sequelize('chat_orm','root','', { host: 'localhost' });

var Message = db.define('Message',{
  text: sequelize.STRING,
  // roomname: sequelize.STRING
});

var User = db.define('User',{
  username: sequelize.STRING
});

var Room = db.define('Room',{
  roomname: sequelize.STRING
});

Message.belongsTo(User);
User.hasMany(Message);
// Message.sync();
// User.sync();

Room.hasMany(Message);
Message.belongsTo(Room);

User.sync();
Message.sync();
Room.sync();

exports.messages = Message;
exports.users = User;
exports.rooms = Room;

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
// var connection = mysql.createConnection({
//   user: 'root',
//   password: '', //try undefined if this doesn't work
//   database: 'chat',
//   host: 'localhost'
// });

// module.exports = connection; //consumer will need to call connect()


