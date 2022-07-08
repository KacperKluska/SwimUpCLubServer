import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  async createNote(@Body() body: { text: string; workoutSessionId: string }) {
    return this.notesService.createNote(body.text, body.workoutSessionId);
  }

  @Delete()
  async deleteNote(@Body() body: { noteId: string }) {
    return this.notesService.deleteNote(body.noteId);
  }

  @Patch()
  async updateNote(@Body() body: { text: string; noteId: string }) {
    return this.notesService.updateNote(body.text, body.noteId);
  }

  @Get('/:id')
  async getNoteById(@Param('id') id: string) {
    return this.notesService.getNoteByNoteId(id);
  }

  @Get()
  async getNotesByWorkoutSessionId(
    @Query() query: { workoutSessionId: string },
  ) {
    return this.notesService.getAllNotesForWorkoutSession(
      query.workoutSessionId,
    );
  }
}
