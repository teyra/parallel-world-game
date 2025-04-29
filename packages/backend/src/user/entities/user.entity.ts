import { prop, getModelForClass } from '@typegoose/typegoose';
import { hashSync } from 'bcryptjs';

export class User {
  @prop({ required: true })
  username: string;
  @prop({
    select: false,
    get(val) {
      return val;
    },
    set(val) {
      return val && hashSync(val, 10);
    },
  })
  password: string;
}

export const UserModel = getModelForClass(User);
