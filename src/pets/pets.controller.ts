// HTTP controller that exposes `/pets` endpoints.
// - GET /pets -> list with query filters
// - GET /pets/:id -> single pet detail
import { Controller, Get, Param, Query } from '@nestjs/common';
import { QueryPetDto } from './dto/query-pet.dto';
import { PetsService } from './pets.service';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  // Accepts query parameters validated by QueryPetDto and returns paged results
  findAll(@Query() query: QueryPetDto) {
    return this.petsService.findAll(query);
  }

  @Get(':id')
  // Returns a single pet by id (throws 404 if not found)
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(id);
  }
}