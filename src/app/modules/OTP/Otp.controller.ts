import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse/sendResponse';
import { TOtp } from './OTP.interface';

import httpStatus from 'http-status';
import { otpService } from './Otp.service';

const createOtp = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await otpService.createOtpIntoDb(body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'otp created successfully',
    data: result,
  });
});
const resetPassword = catchAsync(async (req, res) => {
  const body = req.body;
  const newPassword = body.newPassword;
  //   console.log(body);
  //   console.log(newPassword);
  const result = await otpService.resetPassword(
    body as TOtp,
    newPassword as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'password reset successfully',
    data: result,
  });
});

export const otpController = {
  createOtp,
  resetPassword,
};
