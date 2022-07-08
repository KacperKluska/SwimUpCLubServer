import { Test, TestingModule } from '@nestjs/testing';
import { SwimmingStylesService } from './swimming-styles.service';

describe('SwimmingStylesService', () => {
  let service: SwimmingStylesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SwimmingStylesService],
    }).compile();

    service = module.get<SwimmingStylesService>(SwimmingStylesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
