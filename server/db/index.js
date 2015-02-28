var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
var connection = mysql.createConnection({
  user: 'root',
  password: '', //try undefined if this doesn't work
  database: 'chat',
  host: 'localhost'
});

module.exports = connection; //consumer will need to call connect()


