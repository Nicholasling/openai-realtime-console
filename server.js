import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors({
  // origin: 'https://symmetrical-goldfish-95vr7r4rpp3vjq-3000.app.github.dev',
  origin: 'https://glorious-space-guacamole-75q6v64xgqhwrqx-3000.app.github.dev',
  //origin: 'https://openai-realtime-console-frontend.onrender.com',
  // origin: 'https://runbuddy.run',
  methods: ['GET', 'POST', 'OPTIONS'], // Include 'OPTIONS' for preflight requests
  allowedHeaders: ['Content-Type', 'Authorization'],
  // credentials: true // Allow credentials if required
}));

app.use(express.json());

// Handle preflight requests for CORS + update to *globally
// app.options('/api/runs', cors());
// app.options('*', cors());
// Handle preflight requests for CORS globally
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', allowedOrigin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});

// POST endpoint to create a new run
app.post('/api/runs', async (req, res) => {
  const { runName, time, distance, pace, heartrate, heartratezone } = req.body; // Include 'heartrate' from request body
  try {
    const run = await prisma.run.create({
      data: { runName, time, distance, pace, heartrate, heartratezone },
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


// Add `/audio/speech` Endpoint with Explicit CORS Headers
app.post('/audio/speech', async (req, res) => {
  const { model, voice, input } = req.body;

  // Validate the request
  if (!model || !voice || !input) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    // Simulate TTS processing (replace this with actual TTS logic)
    const audioData = `Simulated audio for: ${input}`;
    const audioBuffer = Buffer.from(audioData);

    // Add CORS headers for the response
    res.header('Access-Control-Allow-Origin', allowedOrigin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Set response type for MP3 and send audio buffer
    res.setHeader('Content-Type', 'audio/mpeg');
    res.status(200).send(audioBuffer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to process TTS request' });
  }
});

// Start the server
app.listen(3001, () => console.log('Server running on http://localhost:3001'));
