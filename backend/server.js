import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import colors from 'colors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();
connectDB();
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// allows us to accept json data in the body
app.use(express.json({ limit: '200mb' }));
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server listening in ${process.env.NODE_ENV} On PORT ${PORT}`.yellow.bold
  )
);
