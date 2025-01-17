import { model, Schema } from 'mongoose';
import { TOtp } from './OTP.interface';
import validator from 'validator';

const userSchema = new Schema<TOtp>(
  {
    email: {
      type: String,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not valid email',
      },
      required: true,
      unique: true,
    },
    otp: {
      type: Number,
      required: true,
      minlength: [6, 'please provide 6 digits'],
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Otp = model<TOtp>('OPT', userSchema);
