import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  inject,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ITodo } from '@core/interfaces/todo.interface';
import { DatePipe } from '@angular/common';
import { ExpireDate } from '@core/enums/expireDate';
import { IColumnConfig } from '@core/interfaces/table.interface';
import { Column } from '@core/enums/columnType';
import { ExpireTimerComponent } from '../../expire-timer/expire-timer.component';

const modules = [
  MatTableModule,
  MatCheckboxModule,
  MatIconModule,
  MatButtonModule,
];

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [DatePipe, ExpireTimerComponent, ...modules],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnChanges {
  @Input() heading: string | null = null;
  @Input() expireDateFormat: ExpireDate = ExpireDate.DATE;
  @Input({ required: true }) items!: ITodo[];
  @Input({ required: true }) columns!: IColumnConfig[];
  @Output() onChange = new EventEmitter<ITodo>();
  @Output() onDelete = new EventEmitter<ITodo>();

  destroyRef = inject(DestroyRef);
  date = ExpireDate.DATE;
  displayedColumns: string[] = [];
  columnDate = Column.DATE;
  columnText = Column.TEXT;
  columnRemove = Column.REMOVE;
  columnFavorite = Column.FAVORITE;
  currentTime = new Date();

  ngOnChanges(): void {
    this.displayedColumns = this.columns.map((col) => col.key);
  }

  handleCheck(todo: ITodo): void {
    this.onChange.emit({ ...todo, checked: !todo.checked });
  }

  handleDelete(todo: ITodo): void {
    this.onDelete.emit(todo);
  }

  handleFavoriteCheck(todo: ITodo): void {
    this.onChange.emit({ ...todo, isFavorite: !todo.isFavorite });
  }
}
