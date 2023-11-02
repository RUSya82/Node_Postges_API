import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';

const userRouter = new Router();
const userController = new UserController();

userRouter.post('/user', userController.createUser.bind(userController));
userRouter.get('/user/:id', userController.getOneUser.bind(userController));
userRouter.get('/user', userController.getAllUsers.bind(userController));
userRouter.get('/findUser', userController.findUser.bind(userController));
userRouter.put('/user', userController.updateUser.bind(userController));
userRouter.delete('/user/:id', userController.deleteUser.bind(userController));

export { userRouter };