import { Test, TestingModule } from '@nestjs/testing';
import { UsersCoachesService } from './users-coaches.service';

describe('UsersCoachesService', () => {
  let service: UsersCoachesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersCoachesService],
    }).compile();

    service = module.get<UsersCoachesService>(UsersCoachesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
