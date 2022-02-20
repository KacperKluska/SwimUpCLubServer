import { Controller, Get } from '@nestjs/common';
import { SeedsService } from './seeds.service';

@Controller('seeds')
export class SeedsController {
  constructor(private seedsService: SeedsService) {}

  @Get()
  async runAllSeeds(): Promise<string[]> {
    const results = [];
    results.push(await this.seedsService.generateGenders());
    results.push(await this.seedsService.generatePoolLengths());
    results.push(await this.seedsService.generateSwimmingStyles());
    results.push(await this.seedsService.generateUserRoles());
    results.push(await this.seedsService.generateWorkoutTypes());

    return results;
  }
}
