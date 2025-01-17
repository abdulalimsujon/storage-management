import { sendEmail } from '../../utilities/sendEmail';
import { Tuser } from './user.interface';
import { User } from './user.model';

const createUserIntoDb = async (data: Tuser) => {
  const result = await User.create(data);

  return result;
};

const forgetPassword = async (email: string) => {
  const isUserExist = await User.findOne({ email: email });
  const sixDigitNumber = Math.floor(100000 + Math.random() * 900000);
  const ui = `your verification code is ${sixDigitNumber}`;
  if (isUserExist) {
    await sendEmail(email, ui);
  }
};

export const userServices = {
  createUserIntoDb,
  forgetPassword,
};
