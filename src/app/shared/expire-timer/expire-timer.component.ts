import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  inject,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-expire-timer',
  standalone: true,
  templateUrl: './expire-timer.component.html',
  styleUrl: './expire-timer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpireTimerComponent {
  @Input({ required: true }) date!: Date;

  cdr = inject(ChangeDetectorRef);
  timer = signal<string | null>(null);
  lessThanHour = signal<boolean>(false);

  constructor() {
    setInterval(() => {
      this.timer.set(this.getFormattedDeadline());
    }, 1000);
  }

  getFormattedDeadline(): string {
    let currentDate = new Date();
    let expirationDate = new Date(this.date);
    const differenceMs = expirationDate.getTime() - currentDate.getTime();
    const hours = Math.floor(differenceMs / (1000 * 60 * 60));
    const minutes = Math.floor((differenceMs / (1000 * 60)) % 60);
    const seconds = Math.floor((differenceMs / 1000) % 60);
    this.lessThanHour.set(hours < 1);

    let timeLeftStr = '';
    if (hours > 0) {
      timeLeftStr += `${hours}h `;
    }
    if (minutes > 0) {
      timeLeftStr += `${minutes}m `;
    }
    timeLeftStr += `${seconds > 0 ? seconds : 0}s`;

    return timeLeftStr;
  }
}
