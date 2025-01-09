import {randomInt} from 'crypto';

export const generateOTP= (length:number) => {
  let otp= '';
  for (let i=0; i<length; i++) {
    otp += randomInt(0, 9);
  }
  return otp;
}