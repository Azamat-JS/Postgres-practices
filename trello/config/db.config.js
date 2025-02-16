const {Pool} = require('pg')

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
})

pool.on('connect', () => {
    console.log('connection pool works');
    
})

module.exports = pool