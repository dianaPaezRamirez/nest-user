import { Body, Controller, Delete, Get, Param, ParseBoolPipe, Patch, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { createTaskDto } from './dto/create-task.dto';
import { ValidatetaskPipe } from './pipe/validatetask/validatetask.pipe';

@Controller("/tasks")
export class TaskController {

    constructor (private taskService:TasksService){}

    @Get()
    getAllTasks(@Query() query:any){
       return this.taskService.getTasks();
    }

    @Get("/message")
    message(@Query(ValidatetaskPipe) query:{name:string;number:number}){
        return `este es el nombre de ${query.name} ${query.number}`;
    }

    @Get("/:id")
    getTask(@Param("id") id:number){
       return this.taskService.getTask(id);
    }

    @Get("/status/:state")
    state(@Param("state", ParseBoolPipe) state:boolean){
        return state;
    }
 

    @Post()
    createTask(@Body() task:createTaskDto){
       return this.taskService.createTasks(task);
    }

    @Put()
    updateTask(){
       return this.taskService.updateTasks();
    }

    @Delete()
    deleteTask(){
       return this.taskService.deleTasks();
    }

    @Patch()
    updateTaskStatus(){
       return this.taskService.updateTaskStatus();
    }

}
