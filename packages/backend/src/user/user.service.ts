import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class UserService {
  constructor(
    @Inject(User.name) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log('🚀 ~ UserService ~ create ~ createUserDto:', createUserDto);
    return await this.userModel.create({});
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByUsername(username: string) {
    console.log("🚀 ~ UserService ~ findByUsername ~ username:", username)
    return await this.userModel.findOne({ username }).exec();
  }
}
