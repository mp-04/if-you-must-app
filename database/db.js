const {Pool} = require('pg');
// pg.defaults.ssl = true;

const PG_URI = 'postgres://pzqzuzhv:gESbfHGbGtiUcQPtEMLa0JgonOzbIXIX@salt.db.elephantsql.com/pzqzuzhv';

const pool = new Pool ({
  connectionString: PG_URI,
  // ssl: true
})

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};