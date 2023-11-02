import { Router } from 'express';
import { PostController } from '../controllers/post.controller.js';

const postRouter = new Router();
const postController = new PostController();

postRouter.post('/post', postController.createPost.bind(postController));
postRouter.get('/post/:id', postController.getPostByUser.bind(postController));


export { postRouter };