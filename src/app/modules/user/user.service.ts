import { checkPassword } from '../../utilities/comparePassword';
import { createToken } from '../../utilities/createToken';
import { sendEmail } from '../../utilities/sendEmail';
import { Tuser } from './user.interface';
import { User } from './user.model';

const createUserIntoDb = async (data: Tuser) => {
  const result = await User.create(data);

  return result;
};

const userLogin = async (payload: Partial<Tuser>) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new Error('This user is not found !');
  }

  const isRightPassword = await checkPassword(
    payload.password as string,
    user.password,
  );
  let token;
  if (isRightPassword) {
    token = createToken(
      { email: user.email, password: user.password },
      'dsak',
      '20d',
    );
  }
  return {
    email: user.email,
    token: token,
  };
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
  userLogin,
  createUserIntoDb,
  forgetPassword,
};
