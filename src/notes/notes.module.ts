import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from 'src/entities/note.entity';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { WorkoutSessionsModule } from 'src/workout-sessions/workout-sessions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Note]), WorkoutSessionsModule],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
