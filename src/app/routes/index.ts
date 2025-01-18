import { Router } from 'express';
import { userRouter } from '../modules/user/user.route';
import { otpRouter } from '../modules/OTP/Otp.route';
import { resourcesRouter } from '../modules/resource/resource.route';
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

  {
    path: '/resources/stats',
    route: resourcesRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
