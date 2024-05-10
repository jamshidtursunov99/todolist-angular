import { Injectable, inject, signal } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { ITodo } from '@core/interfaces/todo.interface';
import { TODOS } from '@core/constants/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  #storage = inject(StorageMap);
  todos = signal<ITodo[]>([]);

  getTodos(): void {
    this.#storage.watch(TODOS).subscribe((todos) => {
      this.todos.set(todos ? (todos as ITodo[]) : []);
    });
  }

  addTodo(newTodo: ITodo): void {
    this.#storage.get(TODOS).subscribe((todos) => {
      const updatedTodos = todos ? [...(todos as ITodo[]), newTodo] : [newTodo];
      this.#storage.set(TODOS, updatedTodos).subscribe();
    });
  }

  updateTodo(todo: ITodo): void {
    this.#storage.get(TODOS).subscribe((todos) => {
      const updatedTodos = (todos as ITodo[]).map((item) =>
        item.id === todo.id ? todo : item,
      );
      this.#storage.set(TODOS, updatedTodos).subscribe();
    });
  }

  deleteTodo(id: string): void {
    this.#storage.get(TODOS).subscribe((todos) => {
      const updatedTodos = (todos as ITodo[]).filter((item) => item.id !== id);
      this.#storage.set(TODOS, updatedTodos).subscribe();
    });
  }
}
