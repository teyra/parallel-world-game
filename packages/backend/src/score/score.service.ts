import { Inject, Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Score } from './entities/score.entity';
import mongoose, { Model, mongo, Mongoose } from 'mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from 'src/user/entities/user.entity';
import { DocumentType } from '@typegoose/typegoose';

@Injectable()
export class ScoreService {
  constructor(
    @Inject(Score.name)
    private readonly scoreModel: ReturnModelType<typeof Score>,
  ) {}
  async create(createScoreDto: CreateScoreDto) {
    return await this.scoreModel.create(createScoreDto);
  }

  async findAll() {
    return await this.scoreModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} score`;
  }

  update(id: number, updateScoreDto: UpdateScoreDto) {
    return `This action updates a #${id} score`;
  }

  remove(id: number) {
    return `This action removes a #${id} score`;
  }
  async getTotalScoreByUser(user: DocumentType<User>) {
    console.log('🚀 ~ ScoreService ~ getTotalScoreByUser ~ user:', user);
    const result = await this.scoreModel.aggregate([
      { $match: { user: user._id } },
      { $group: { _id: user._id, totalScore: { $sum: '$score' } } },
    ]);
    console.log('🚀 ~ ScoreService ~ getTotalScoreByUser ~ result:', result);
    return result.length > 0 ? result[0].totalScore : 0; // 返回总得分，如果没有记录则返回0
  }
}
