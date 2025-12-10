// init_db.js - initialize database schema
const db = require('./db');
(async ()=>{
  try {
    await db.init();
    console.log('Database initialized.');
  } catch(e) {
    console.error('Init failed', e);
  }
})();