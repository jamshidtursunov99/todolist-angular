import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  formatTodoExpireDate(expireDate: Date, expireTime: string): Date {
    if (!expireTime) return expireDate!;

    const [time, period] = expireTime.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let hours24 = hours;

    if (period === 'PM' && hours !== 12) {
      hours24 += 12;
    } else if (period === 'AM' && hours === 12) {
      hours24 = 0;
    }

    const updatedExpireDate = new Date(expireDate);
    updatedExpireDate.setHours(hours24, minutes);
    return updatedExpireDate;
  }
}
