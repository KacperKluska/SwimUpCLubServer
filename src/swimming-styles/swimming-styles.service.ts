import { Injectable } from '@nestjs/common';
import { SwimmingStyle } from 'src/entities/swimming-style.entity';

@Injectable()
export class SwimmingStylesService {
  async findAllSwimmingStyles(): Promise<SwimmingStyle[]> {
    return await SwimmingStyle.find();
  }

  async findSwimmingStyleByName(style: string): Promise<SwimmingStyle> {
    return await SwimmingStyle.findOne({ style });
  }
}
