import config from '../../config';
import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse/sendResponse';
import { userServices } from './user.service';
import httpStatus from 'http-status';

const createUser = catchAsync(async (req, res) => {
  const reqBody = req.body;
  const result = await userServices.createUserIntoDb(reqBody);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: result,
  });
});
const userlogin = catchAsync(async (req, res) => {
  const result = await userServices.userLogin(req.body);
  const { email, token } = result;

  res.cookie(
    'refreshToken',
    { email, token: token },
    {
      secure: config.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 365,
    },
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User log in successfully',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const reqBody = req.body.email;
  const result = await userServices.forgetPassword(reqBody);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reset link is generated succesfully!',
    data: result,
  });
});

export const usercontroller = {
  createUser,
  forgetPassword,
  userlogin,
};
