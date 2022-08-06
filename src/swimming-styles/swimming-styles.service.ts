import { Injectable } from '@nestjs/common';
import { SwimmingStyle } from 'src/entities/swimming-style.entity';
import { MyResponse } from 'src/shared_dto/response';
import { serverErrorResponse } from 'src/shared_dto/error';

@Injectable()
export class SwimmingStylesService {
  async findAllSwimmingStyles(): Promise<MyResponse> {
    try {
      const swimmingStyles = await SwimmingStyle.find();
      return {
        status: 200,
        data: { swimmingStyles },
        message: `Success`,
      };
    } catch (error) {
      return serverErrorResponse(error);
    }
  }

  async findSwimmingStyleByName(style: string): Promise<SwimmingStyle> {
    return await SwimmingStyle.findOne({ style });
  }
}
