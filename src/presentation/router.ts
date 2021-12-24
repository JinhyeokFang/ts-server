import { Router } from 'express';
import JWT from '../infrastructure/authorization/jwt';
import environmentVariablesLoader from '../infrastructure/environmentVariables/envLoader';
import UserController from './controllers/user.controller';

const router = Router();
const secretKey = environmentVariablesLoader.variables.SECRET_KEY;
const authorization = new JWT(secretKey);

const userController = new UserController(authorization);

router.use(userController.baseURL, userController.router);

export default router;
