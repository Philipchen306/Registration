require('dotenv').config()

module.exports = {
    mysql: {
      host: process.env.HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      debug: true,
      authPlugin: 'mysql_native_password',
      insecureAuth: true,
      allowPublicKeyRetrieval: true
    },
    secret: process.env.MY_SECRET
}