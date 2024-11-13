import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: 'https://symmetrical-goldfish-95vr7r4rpp3vjq-3000.app.github.dev',
  methods: ['GET', 'POST', 'OPTIONS'], // Include 'OPTIONS' for preflight requests
  allowedHeaders: ['Content-Type', 'Authorization'],
  // credentials: true // Allow credentials if required
}));

app.use(express.json());

// Handle preflight requests for CORS
app.options('/api/runs', cors());

// POST endpoint to create a new run
app.post('/api/runs', async (req, res) => {
  const { runName, time, distance, heartrate, heartratezone } = req.body; // Include 'heartrate' from request body
  try {
    const run = await prisma.run.create({
      data: { runName, time, distance, heartrate, heartratezone },
    });
    res.json(run);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create run' });
  }
});

// GET endpoint to retrieve runs
app.get('/api/runs', async (req, res) => {
  try {
    const runs = await prisma.run.findMany({
      orderBy: { createdAt: 'desc' }, // Sort by 'createdAt' in descending order
    });
    res.json(runs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve runs' });
  }
});

// Start the server
app.listen(3001, () => console.log('Server running on http://localhost:3001'));
