import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';
import { TodoService } from '@core/services/todo.service';
import { ITodo } from '@core/interfaces/todo.interface';
import { FormStatus } from '@core/enums/formStatus';
import { ValidationService } from '@core/services/validation.service';
import { Router } from '@angular/router';
import { RoutePaths } from '@core/enums/routePaths';
import { DateService } from '@core/services/date.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

const modules = [
  CommonModule,
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule,
  MatDatepickerModule,
  MatIconModule,
  NgxMaterialTimepickerModule,
  MatButtonModule,
];

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [...modules],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddComponent implements OnInit {
  router = inject(Router);
  location = inject(Location);
  todoService = inject(TodoService);
  dateService = inject(DateService);
  validateService = inject(ValidationService);
  destroyRef = inject(DestroyRef);
  submitted = false;

  todoForm = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    expireDate: new FormControl<Date | null>(null, [
      Validators.required,
      this.validateService.validateExpireDate,
    ]),
    expireTime: new FormControl<string | null>(null),
  });

  ngOnInit(): void {
    this.validateExpireTime();
  }

  get titleError(): string {
    const title = this.todoForm.get('title');
    return this.validateService.validate(title!, {
      submitted: this.submitted,
      field: 'Title',
    });
  }

  get expireDateError(): string {
    const expDate = this.todoForm.get('expireDate');
    return this.validateService.validate(expDate!, {
      submitted: this.submitted,
      field: 'Expire date',
    });
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  handleBack(): void {
    this.location.back();
  }

  buildNewTodo(): ITodo {
    const { title, expireDate, expireTime } = this.todoForm.value;
    const updatedExpireDate = this.dateService.formatTodoExpireDate(
      expireDate!,
      expireTime!,
    );

    return {
      title: title!,
      createdAt: new Date(),
      expireDate: updatedExpireDate,
      checked: false,
      id: uuidv4(),
      isFavorite: false,
    };
  }

  handleSubmit(): void {
    this.submitted = true;
    const newTodo = this.buildNewTodo();
    const isValidForm = this.todoForm.status !== FormStatus.INVALID;

    if (isValidForm) {
      this.todoService.addTodo(newTodo);
      this.router.navigate([RoutePaths.LIST]);
    }
  }

  validateExpireTime(): void {
    const expireDateControl = this.todoForm.get('expireDate');
    const expireTimecControl = this.todoForm.get('expireTime');
    expireDateControl?.valueChanges
      .pipe(filter(Boolean), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        if (this.isToday(value)) {
          expireDateControl?.setValidators([
            Validators.required,
            this.validateService.validateExpireTime,
          ]);
        } else {
          expireTimecControl?.clearValidators();
        }
        expireTimecControl?.updateValueAndValidity();
      });
  }
}
