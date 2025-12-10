// db.js - sqlite helper using sqlite3 with Promises
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'data.sqlite');

const db = new sqlite3.Database(dbPath);

function run(sql, params=[]) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if(err) return reject(err);
      resolve(this.lastID);
    });
  });
}

function all(sql, params=[]) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if(err) return reject(err);
      resolve(rows);
    });
  });
}

module.exports = {
  init: async () => {
    const sql = `CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );`;
    await run(sql);
  },
  insertLead: async (name, email) => {
    const sql = 'INSERT INTO leads (name,email) VALUES (?,?)';
    return await run(sql, [name, email]);
  },
  getLeads: async () => {
    const sql = 'SELECT id, name, email, created_at FROM leads ORDER BY id DESC LIMIT 500';
    return await all(sql);
  }
};
