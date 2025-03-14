import { Injectable } from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { PrismaService } from 'prisma.service';

@Injectable()
export class EducationsService {

  constructor(private prisma:PrismaService){}

  async create(createEducationDto: CreateEducationDto) {
    const createdStidie= await this.prisma.educations.create({
      data:{
        name:createEducationDto.name,
        instituto:createEducationDto.instituto,
      }
    })
    return createdStidie;
  }

  findAll() {
    const institutions = this.prisma.educations.findMany();
    return institutions;
  }

  findOne(id: string) {
    const institution = this.prisma.educations.findUnique({
      where:{id:id}
    });
    return institution;
  }

  update(id: string, updateEducationDto: UpdateEducationDto) {
    const updatedInstitution = this.prisma.educations.update({data:updateEducationDto,where:{id:id}});
    return updatedInstitution;
  }

  remove(id: string) {
    return this.prisma.educations.delete({where:{id:id}});
  }
}
