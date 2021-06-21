import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import * as io from 'socket.io';
import colors from 'colors';
import connectDB from './config/db.js';
import socketServer from './socket/socket.js';
import apiRouter from './routes/index.js';

dotenv.config();
connectDB();
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// allows us to accept json data in the body
app.use(express.json({ limit: '200mb' }));
app.use(cors());
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 5000;

const expressServer = app.listen(
  PORT,
  console.log(
    `Server listening in ${process.env.NODE_ENV} On PORT ${PORT}`.yellow.bold
  )
);

const socketio = new io.Server(expressServer, {
  cors: {
    origin: '*',
  },
});

app.set('socketio', socketio);
socketServer(socketio);
