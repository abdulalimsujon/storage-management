import express from 'express';
import { otpController } from './Otp.controller';

const router = express.Router();
router.post('/create-otp', otpController.createOtp);
router.patch('/reset-password', otpController.resetPassword);

export const otpRouter = router;
