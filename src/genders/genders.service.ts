import { Injectable } from '@nestjs/common';
import { Gender } from 'src/entities/gender.entity';

@Injectable()
export class GendersService {
  async findByName(gender: string): Promise<Gender> {
    return await Gender.findOne({ gender });
  }

  async findAllGenders(): Promise<Gender[]> {
    return await Gender.find();
  }
}
