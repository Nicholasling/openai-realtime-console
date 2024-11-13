import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: 'https://symmetrical-goldfish-95vr7r4rpp3vjq-3000.app.github.dev',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type, Authorization'
}));
app.use(express.json());

app.post('/api/runs', async (req, res) => {
  const { runName, time, distance } = req.body;
  const run = await prisma.run.create({
    data: { runName, time, distance },
  });
  res.json(run);
});

app.get('/api/runs', async (req, res) => {
  const runs = await prisma.run.findMany({
    orderBy: {
      createdAt: 'desc', // Sort by `createdAt` in descending order
    },
  });  res.json(runs);
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));
