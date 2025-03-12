import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma.service';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {}

  async create(user: CreateUserDto) {
    try {
      const userCreated = await this.prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
          lastName: user.lastName,
          password: user.password,
          contactPhone: user.contactPhone,
          roles: user.roles,
          educations: user.educations
            ? {
                create: user.educations.map(educationId => ({
                  profession: { connect: { id: educationId } } // Conecta educationId con Educations
                })),
              }
            : undefined,
          skills: user.skills,
          experience: user.experience?{connect:user.experience.map((experience)=>({id:experience}))}:undefined,
          ratings: user.ratings?{connect:user.ratings.map((rating)=>({id:rating}))}:undefined,
          avatar: user.avatar,
          categories: user.categories
          ? {
              create: user.categories.map((categoryId) => ({
                category: { connect: { id: categoryId } }, // Relacionar categoría existente
              })),
            }
          : undefined,
        }
      });
      
      return userCreated
      
    } catch (error) {
      
      throw new Error("Error creating user");
      
    }
    
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
      where: { id : id } ,
      include:{
        categories:{
          include:{
            category:
              {
                select: {
                  id: true,
                  name: true, // 🔹 Solo traer ID y nombre de la categoría
                },
              }
            }
        },
        educations: true,
        experience: true,
        ratings: true,
    }
  })
    return userFound
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userUpdated= await this.prisma.user.update({
      where: { id: id },
      data: {
        email: updateUserDto.email,
        name: updateUserDto.name,
        lastName: updateUserDto.lastName,
        password: updateUserDto.password,
        contactPhone: updateUserDto.contactPhone,
        roles: updateUserDto.roles,
        categories: updateUserDto.categories?
        { 
          create: updateUserDto.categories?.map(categoriesId=>({
            category:{connect:{id:categoriesId}}
          })),}:undefined,
        educations: updateUserDto.educations
          ? {
              create: updateUserDto.educations.map(educationId => ({
                profession: { connect: { id: educationId } } // Conecta educationId con Educations
              })),
            }
          : undefined,
        skills: updateUserDto.skills,
        experience: updateUserDto.experience?{connect:updateUserDto.experience.map((experience)=>({id:experience}))}:undefined,
        ratings: updateUserDto.ratings?{connect:updateUserDto.ratings.map((rating)=>({id:rating}))}:undefined,
        avatar: updateUserDto.avatar
      }
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
