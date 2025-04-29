import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ScoreService } from './score.service';
import { UpdateScoreDto } from './dto/update-score.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { DocumentType } from '@typegoose/typegoose';
@ApiTags('Score')
@Controller('score')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post()
  create(@Body() score: any, @CurrentUser() user: DocumentType<User>) {
    return this.scoreService.create({
      ...score,
      user: user._id, // 将用户ID添加到得分记录中
    });
  }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.scoreService.findAll();
  }

  @Get('check-score')
  async checkScore(@CurrentUser() user: DocumentType<User>) {
    return await this.scoreService.getTotalScoreByUser(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scoreService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScoreDto: UpdateScoreDto) {
    return this.scoreService.update(+id, updateScoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scoreService.remove(+id);
  }
}
