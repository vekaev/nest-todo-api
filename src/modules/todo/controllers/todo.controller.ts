import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put
} from '@nestjs/common';
import {Todo} from "../entities/todo.entity";
import {CreateTodoDto, UpdateTodoDto} from "./dto";
import {TodoService} from "../service/todo.service";

@Controller('rest/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {
  }

  @Get()
  getAllActions(): Promise<Todo[]> {
    return this.todoService.findAll()
  }

  @Get(':id')
  async getOneAction(@Param('id') id: string): Promise<Todo> {
    const todo = await this.todoService.findOne(id);

    if (todo === undefined) {
      throw new HttpException(
        'Todo with id=' + id + ' not exists',
        HttpStatus.NOT_FOUND
      );
    }

    return todo
  }

  @Post()
  async createAction(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = new Todo();
    todo.title = createTodoDto.title;
    if (createTodoDto.isCompleted) {
      todo.isCompleted = createTodoDto.isCompleted;
    }

    return this.todoService.create(todo)
  }

  @Put(':id')
  async updateAction(
    @Body() {title, isCompleted}: UpdateTodoDto,
    @Param('id'
    ) id: string): Promise<Todo> {

    const todo = await this.todoService.findOne(id);

    if (todo === undefined) {
      throw new NotFoundException('Todo with id=' + id + ' not exists');
    }

    todo.title = title;
    todo.isCompleted = isCompleted;

    return this.todoService.update(todo)
  }



  
  @Delete(':id')
  async deleteAction(@Param('id') id: string): Promise<{ success : boolean }> {
      const todo = await this.todoService.findOne(id);

      if (todo === undefined) {
        throw new NotFoundException('Todo with id=' + id + ' not exists');
      }

      await this.todoService.remove(id)
      
      return {
        success: true
      }
  }

}
