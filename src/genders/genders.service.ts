import { Injectable } from '@nestjs/common';
import { Gender } from 'src/entities/gender.entity';

@Injectable()
export class GendersService {
  async findByName(gender: string) {
    const result = await Gender.findOne({ gender });
    return result;
  }
}
