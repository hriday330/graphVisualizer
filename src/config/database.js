const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost', 
  user: 'hriday', 
  password: 'S@rode774', 
  database: 'graphAlive',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the database successfully');
});


module.exports = pool;
