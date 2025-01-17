import config from '../../config';
import { User } from '../user/user.model';
import { TOtp } from './OTP.interface';
import { Otp } from './otp.model';
import bcrypt from 'bcrypt';

const createOtpIntoDb = async (data: TOtp) => {
  const isUserExist = await User.findOne({ email: data.email });
  if (!isUserExist) {
    throw new Error('the user is not exist');
  }
  const result = await Otp.create(data);
  return result;
};

const resetPassword = async (data: TOtp, newPassword: string) => {
  const checkOtp = await Otp.findOne({ email: data.email, otp: data.otp });

  if (!checkOtp) {
    throw new Error('the otp or user is not exist');
  }
  const isOtpUsed = await Otp.findOne({ status: true, email: data.email });
  if (isOtpUsed) {
    throw new Error('the otp is already used');
  }
  const hashPassword = await bcrypt.hash(
    newPassword,
    Number(config.salt_round),
  );
  const updatePassword = await User.findOneAndUpdate(
    { email: data.email },
    { password: hashPassword, status: true },
    { new: true },
  );

  return updatePassword;
};

export const otpService = {
  createOtpIntoDb,
  resetPassword,
};
