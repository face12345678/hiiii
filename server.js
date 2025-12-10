// server.js - Simple Express server serving static site and API for leads
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// serve static
app.use(express.static(path.join(__dirname, 'public')));

// API: submit lead
app.post('/api/leads', async (req, res) => {
  try {
    const { name, email } = req.body;
    if(!name || !email) return res.status(400).json({ error:'name and email required' });
    const id = await db.insertLead(name, email);
    res.json({ success:true, id });
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'internal' });
  }
});

// API: list leads (simple, no auth — in production protect this)
app.get('/api/leads', async (req, res) => {
  try {
    const rows = await db.getLeads();
    res.json(rows);
  } catch(err) {
    console.error(err);
    res.status(500).json({ error:'internal' });
  }
});

// health
app.get('/ping', (req,res)=> res.json({ ok:true }));

app.listen(PORT, ()=> console.log(`Server running on http://localhost:${PORT}`));
