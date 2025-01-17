import { Router } from 'express';
import { userRouter } from '../modules/user/user.route';
import { otpRouter } from '../modules/OTP/Otp.route';
const router = Router();
const moduleRoutes = [
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/otp',
    route: otpRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
