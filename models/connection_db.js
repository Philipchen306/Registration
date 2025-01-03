const config = require('../config/development_config');
const mysqlt = require("mysql2");

const connection = mysqlt.createConnection({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
//   // add new options
//   authPlugin: 'mysql_native_password',
//   insecureAuth: true,
//   // If using MySQL 8.0+
//   allowPublicKeyRetrieval: truem
});

connection.connect(err => {
  if (err) {
    console.log('connecting error!',err);
  } else {
    console.log('connecting success');
  }
});

module.exports = connection;