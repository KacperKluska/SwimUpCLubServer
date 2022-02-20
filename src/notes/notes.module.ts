import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from 'src/entities/note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [],
  providers: [],
})
export class NotesModule {}
