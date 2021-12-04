import { Router } from 'express';
import UserController from './controllers/user.controller';

const router = Router();

const userController = new UserController();

router.use(userController.baseURL, userController.router);

export default router;
