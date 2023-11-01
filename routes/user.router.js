import {Router} from "express";
import {UserController} from "../controllers/user.controller.js";

const router = new Router();
const userController = new UserController();

router.post('/user', userController.createUser)
router.get('/user/:id', userController.getOneUser)
router.get('/user', userController.getAllUsers)
router.put('/user', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)

export  {router}