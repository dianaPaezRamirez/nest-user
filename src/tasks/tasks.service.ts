import { Injectable, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { createTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {

    private tasks:createTaskDto[]=[]

    getTasks(){
        return this.tasks
    }

    getTask(id:number){
        const found =  this.tasks.find((task:createTaskDto) => task.id === id)

        console.log(id)

        if(!found){
            return new NotFoundException("noe conrtada")
        }

        return found
    }

      
    createTasks(task:createTaskDto){
        this.tasks.push({
            ...task,
            id: this.tasks.length + 1
        });
          return task
    }

    updateTasks(){
        return "update tareas"
    }

    deleTasks(){
        return "delete tareas"
    }

    updateTaskStatus(){
        return "update status tareas"
    }
}
