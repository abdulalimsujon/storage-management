import express from 'express';
import { otpController } from './otp.controller';
const router = express.Router();
router.post('/create-otp', otpController.createOtp);
router.patch('/reset-password', otpController.resetPassword);

export const otpRouter = router;
