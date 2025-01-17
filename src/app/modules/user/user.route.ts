import express from 'express';
import { usercontroller } from './user.controller';
const router = express.Router();
router.post('/', usercontroller.createUser);

export const userRouter = router;
