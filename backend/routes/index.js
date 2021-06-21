import express from 'express';
import userRoutes from './userRoutes.js';
import postRoutes from './postRoutes.js';
import notificationRoutes from './notificationRoutes.js';
import chatRoutes from './chatRoutes.js';
import uploadRoutes from './uploadRoutes.js';
import commentRoutes from './commentRoutes.js';

const apiRouter = express.Router();

apiRouter.use('/users', userRoutes);
apiRouter.use('/posts', postRoutes);
apiRouter.use('/notifications', notificationRoutes);
apiRouter.use('/chats', chatRoutes);
apiRouter.use('/uploads', uploadRoutes);
apiRouter.use('/comments', commentRoutes);

export default apiRouter;
