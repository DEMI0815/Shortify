import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import shortenRouter from './routes/shorten.js';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/shortify', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connect('mongodb://localhost:27017/shortify', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api', shortenRouter);

app.listen(3001, () => {
  console.log('Backend running on http://localhost:3001');
});