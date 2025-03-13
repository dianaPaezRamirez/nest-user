import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'prisma.service';

@Injectable()
export class CategoriesService {

   constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const categoryCreated = await this.prisma.category.create({
      data:{name:createCategoryDto.name}
    })
    return categoryCreated;
  }

  async findAll() {
    const categories = await this.prisma.category.findMany();
    return categories;
  }

  async findOne(id: string) {

    const category = await this.prisma.category.findUnique({
      where:{id:id}
    })
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
 
    const categoryUpdated = await this.prisma.category.update({
      where:{id:id},
      data:{name:updateCategoryDto.name}    
    })
    
    return categoryUpdated;
  }

  remove(id: string) {
    const categoryDeleted=this.prisma.category.delete({
      where:{id:id}
    })
    return categoryDeleted;
  }
}
