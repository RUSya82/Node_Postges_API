import express from 'express';
import { router } from './routes/user.router.js';

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use('/api', router);


app.listen(PORT, () => {
    console.log('Server started at port ' + PORT);
});