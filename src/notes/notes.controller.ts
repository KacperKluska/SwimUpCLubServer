import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';
import { Role } from 'src/auth/utils/roles.enum';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  @Roles(Role.COACH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createNote(@Body() body: { text: string; workoutSessionId: string }) {
    return this.notesService.createNote(body.text, body.workoutSessionId);
  }

  @Delete()
  @Roles(Role.COACH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteNote(@Body() body: { noteId: string }) {
    return this.notesService.deleteNote(body.noteId);
  }

  @Patch()
  @Roles(Role.COACH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateNote(@Body() body: { text: string; noteId: string }) {
    return this.notesService.updateNote(body.text, body.noteId);
  }

  @Get('/:id')
  @Roles(Role.COACH, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getNoteById(@Param('id') id: string) {
    return this.notesService.getNoteByNoteId(id);
  }

  @Get()
  @Roles(Role.COACH, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getNotesByWorkoutSessionId(
    @Query() query: { workoutSessionId: string },
  ) {
    return this.notesService.getAllNotesForWorkoutSession(
      query.workoutSessionId,
    );
  }
}
