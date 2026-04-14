import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3001;
const DB_FILE = './certiyup_db.json';

// Initialize the local database if it doesn't exist
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ users: [] }, null, 2));
}

app.use(express.json());

// Root route to confirm server is alive
app.get('/', (req, res) => {
  res.json({ 
    status: 'online', 
    message: 'Certiyup Backend is RUNNING ERROR-FREE!',
    mode: 'Local-Integrated'
  });
});

// Authentication Endpoint
app.post('/api/auth', async (req, res) => {
  const { action, email, firstName, lastNameInitial, role } = req.body;
  
  try {
    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

    if (action === 'signup') {
      const existingUser = db.users.find(u => u.email === email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const newUser = {
        id: `u_${Date.now()}`,
        email,
        firstName: firstName || 'New',
        lastNameInitial: lastNameInitial || 'U.',
        role: role || 'student',
        tokenBalance: 250,
        rating: 4.8,
        createdAt: new Date().toISOString()
      };

      db.users.push(newUser);
      fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
      return res.status(201).json({ user: newUser });
    } 
    
    if (action === 'login') {
      const user = db.users.find(u => u.email === email);
      if (user) {
        return res.status(200).json({ user });
      } else {
        return res.status(401).json({ message: 'User not found. Please sign up.' });
      }
    }
  } catch (error) {
    console.error('Auth Error:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`\n✅ Certiyup Backend: READY & ERROR-FREE`);
  console.log(`🔗 Local API: http://localhost:${port}`);
  console.log(`👉 Press Ctrl+C to stop the server\n`);
});
