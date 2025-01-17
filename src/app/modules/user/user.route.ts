import express from 'express';
import { usercontroller } from './user.controller';
const router = express.Router();
router.post('/', usercontroller.createUser);
router.post('/login', usercontroller.userlogin);
router.post('/forget-password', usercontroller.forgetPassword);

export const userRouter = router;
