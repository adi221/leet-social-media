import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import * as io from 'socket.io';
import colors from 'colors';
import jwt from 'jsonwebtoken';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

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
app.use('/api/notifications', notificationRoutes);

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

// Authenticate before establishing a socket connection
socketio
  .use((socket, next) => {
    const token = socket.handshake.query.token;
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);

        if (!user) {
          return next(new Error('Not authorized.'));
        }
        socket.user = user;
        return next();
      } catch (err) {
        next(err);
      }
    } else {
      return next(new Error('Not authorized.'));
    }
  })
  .on('connection', socket => {
    socket.join(socket.user.id.toString());
    console.log(`socket connected  ${socket.user.id}`.green.bold);

    // Listen for new messages
    socket.on('newNotification', data => {
      console.log('Sent');
    });
  });
