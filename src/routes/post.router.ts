import { Router } from 'express';
import { PostController } from '../controllers/post.controller';
import { PostService } from '../services/post.service';

const postRouter = Router();
const postController = new PostController(new PostService());

postRouter.post('/post', postController.createPost.bind(postController));
postRouter.get('/post/:id', postController.getOne.bind(postController));
postRouter.get('/postByUser/:id', postController.getPostByUser.bind(postController));


export { postRouter };