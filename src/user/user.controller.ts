import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { last } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  async create(@Body() createUser: CreateUserDto) {
    return this.userService.create(createUser);
  }

  @Get()
  @ApiOperation({ summary: 'Get all'})
  async findAll() {
    return this.userService.findAll();
  }

  @Get("/table")
  @ApiOperation({ summary: 'Get all width page'})
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  async  findAllForTable(@Query('page') page: number, @Query('limit') limit: number) {
    return this.userService.findAllForTable(Number(page), Number(limit));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one' })
  async findOne(@Param('id') id: string) {
    const userFounded= await this.userService.findOne(id)
    return  {
      statusCode: 200,
      message: 'Usuario encontrado',
      data: {
        id: userFounded?.id,
        name: userFounded?.name,
        lastName: userFounded?.lastName,
        contactPhone: userFounded?.contactPhone,
        roles: userFounded?.roles,
        skills: userFounded?.skills,
        experience: userFounded?.experience,
        ratings: userFounded?.ratings,
        educations: userFounded?.educations,
        avatar: userFounded?.avatar,
        email: userFounded?.email,
        categories: userFounded?.categories.map(uc => uc.category), // 🔹 Extraer solo las categorías
      },
    };;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update one' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one' })
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
