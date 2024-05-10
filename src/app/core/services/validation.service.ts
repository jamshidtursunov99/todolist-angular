import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { IValidationOptions } from '@core/interfaces/validation.interface';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  validate(control: AbstractControl, options: IValidationOptions): string {
    let error = '';
    if (
      control &&
      control.invalid &&
      (control.dirty || control.touched || options.submitted)
    ) {
      const hasMaxLength = control!.errors!['maxlength'];
      hasMaxLength &&
        (error = `${options.field} can not exceed more than ${
          control!.errors!['maxlength'].requiredLength
        }`);

      const hasInvalidDate = control!.errors!['invalidDate'];
      hasInvalidDate &&
        (error =
          'The selected expiration date cannot be earlier than the current date.');

      const hasRequiredErr = control!.errors!['required'];
      hasRequiredErr && (error = `${options.field} is required!`);
    }
    return error;
  }

  validateExpireDate(control: AbstractControl): { [key: string]: any } | null {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const expirationDate = new Date(control.value);

    if (expirationDate < currentDate) {
      return { invalidDate: true };
    }
    return null;
  }

  validateExpireTime(control: AbstractControl): { [key: string]: any } | null {
    const currentTime = new Date();
    const expireTime = new Date(control.value);
    if (expireTime < currentTime) {
      return { invalidTime: true };
    }
    return null;
  }
}
