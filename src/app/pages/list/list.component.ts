import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { RoutePaths } from '@core/enums/routePaths';
import { TableComponent } from '@shared/components/table/table.component';
import { TodoService } from '@core/services/todo.service';
import { ExpireDate } from '@core/enums/expireDate';
import {
  COLUMNS_ALL,
  COLUMNS_TODAY,
  HEADING,
} from '@core/constants/table-config';
import { ITodo } from '@core/interfaces/todo.interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  route = inject(ActivatedRoute);
  todoService = inject(TodoService);
  routeUrlPath = toSignal(this.route.url.pipe(map((url) => url[0].path)));
  isListPath = computed(() => this.routeUrlPath() === RoutePaths.LIST);
  tableHeading = HEADING;
  todos = this.todoService.todos;
  date = ExpireDate.DATE;
  hours = ExpireDate.HOURS;
  columnsAll = COLUMNS_ALL;
  columnsToday = COLUMNS_TODAY;
  todaysTodos = computed(() => {
    const today = new Date();
    return this.todos().filter(
      (todo) => todo.expireDate.toDateString() === today.toDateString(),
    );
  });
  restTodos = computed(() => {
    const today = new Date();
    return this.todos().filter(
      (todo) => todo.expireDate.toDateString() !== today.toDateString(),
    );
  });
  favoriteTodos = computed(() => {
    return this.todos().filter((todo) => todo.isFavorite);
  });

  ngOnInit(): void {
    this.todoService.getTodos();
  }

  handleTodoCheck(todo: ITodo) {
    this.todoService.updateTodo(todo);
  }

  handleDeleteTodo(todo: ITodo) {
    this.todoService.deleteTodo(todo.id);
  }
}
