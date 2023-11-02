import express from 'express';
import { userRouter  } from './routes/user.router.js';
import {postRouter} from './routes/post.router.js';

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use('/api', userRouter);
app.use('/api', postRouter);


app.listen(PORT, () => {
    console.log('Server started at port ' + PORT);
});