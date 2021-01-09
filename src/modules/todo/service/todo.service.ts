import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Todo} from "../entities/todo.entity";

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find()
  }

  findOne(id): Promise<Todo>{
    return this.todoRepository.findOne(id)
  }

  create(todo): Promise<Todo>{
    delete todo.id
    return this.todoRepository.save(todo)
  }

  update (todo): Promise<Todo>{
    return this.todoRepository.save(todo)
  }

  async remove (id): Promise<void>{
    await this.todoRepository.delete(id)
  }


}
