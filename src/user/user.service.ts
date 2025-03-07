import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma.service';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {}

  async create(user: CreateUserDto) {

    const userCreated =await this.prisma.user.create({
      data: user
    });
    return userCreated
  }

  async findAll() {
    const users=await this.prisma.user.findMany();
    return users;
  }

  async findAllForTable(page:number,limit:number) {
    const skip = (page - 1) * limit;

    const users = await this.prisma.user.findMany({
      skip,
      take: limit,
    });

    const total = await this.prisma.user.count();

     return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: users,
    };
  }

  async findOne(id: string) {
    const userFound = await this.prisma.user.findUnique({
      where: { id : id } 
  })
    return userFound
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userUpdated= await this.prisma.user.update({
      where: { id: id },
      data: updateUserDto
    })
    return userUpdated;
  }

  async remove(id: string) {
    
    const userDeleted = await  this.prisma.user.delete({
      where: { id: id }
    });

    return userDeleted
  }
}
