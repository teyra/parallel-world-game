import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from 'src/user/entities/user.entity';
export class Score {
  @prop({ ref: () => User, required: true })
  user: Ref<User>;
  @prop({ required: true })
  score: number;
}

export const ScoreModel = getModelForClass(Score);
