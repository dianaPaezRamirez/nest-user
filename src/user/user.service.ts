import { BadRequestException, Injectable } from '@nestjs/common';
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
          experience: user?.experience
          ? {
              create: user.experience.map((experience) => ({
                titulo: experience.titulo, // 🔥 Agregar este campo obligatorio
                place: experience.place,
                startDate: new Date(experience.startDate), // Asegurar que sea Date
                endDate:  new Date(experience.endDate) ,
                description: experience.description,
              })),
            }
          : undefined,
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
        educations: {
          include: {
            profession:{
              select:{id:true,name:true}
            } ,
          },
          omit: { userId: true,professionId:true }, // 🔹 Excluir el ID de Educations
        },
        experience: true,
        ratings: true,
    },
    omit: { password: true }, // 🔹 Excluir la contraseña
  })
    return userFound
  }



  async update(id: string, updateUserDto: UpdateUserDto) {
     // Asegurar que si el email ya existe, pertenece al mismo usuario
  if (updateUserDto.email) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: updateUserDto.email },
    });

    if (existingUser && existingUser.id !== id) {
      throw new BadRequestException({
        status: 400,
        message: 'El email ya está en uso por otro usuario',
      });
    }
  }

    const userUpdated= await this.prisma.user.update({
      where: { id: id },
      data: {
      ...(updateUserDto.email && { email: updateUserDto.email }), // Solo actualizar si existe
      ...(updateUserDto.name && { name: updateUserDto.name }),
      ...(updateUserDto.lastName && { lastName: updateUserDto.lastName }),
      ...(updateUserDto.password && { password: updateUserDto.password }),
      ...(updateUserDto.contactPhone && { contactPhone: updateUserDto.contactPhone }),
      ...(updateUserDto.roles && { roles: updateUserDto.roles }),
      ...(updateUserDto.categories && { categories: updateUserDto.categories?
        { 
          deleteMany: {},
          create: updateUserDto.categories?.map(categoriesId=>({
            category:{connect:{id:categoriesId}}
          })),}:undefined,}),
      ...( updateUserDto.educations && {  educations: updateUserDto.educations
        ? {
          deleteMany: {},
            create: updateUserDto.educations.map(educationId => ({
              profession: { connect: { id: educationId } } // Conecta educationId con Educations
            })),
          }
        : undefined,}),
      ...(updateUserDto.skills&&{skills:updateUserDto.skills}),
      ...(updateUserDto.experience && { experience: updateUserDto.experience?{
        deleteMany: {},
        
          create: updateUserDto.experience.map((experience) => ({
            titulo: experience.titulo, 
            place: experience.place,
            startDate: new Date(experience.startDate),
            endDate:  new Date(experience.endDate) ,
            description: experience.description,
          })),
        
      }:undefined,}),
       ...(updateUserDto.ratings && { ratings: updateUserDto.ratings?{connect:updateUserDto.ratings.map((rating)=>({id:rating}))}:undefined,}),
       ...(updateUserDto.avatar && {avatar: updateUserDto.avatar}),
      },
      include: {
        categories: {
          include: { category: true },
        },
        educations: {
          include: {
            profession:{
              select:{id:true,name:true}
            } ,
          },
          omit: { userId: true,professionId:true }, // 🔹 Excluir el ID de Educations
        },
        experience: true,
        ratings: true,
      },
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
