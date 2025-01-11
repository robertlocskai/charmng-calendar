import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-calendar-hour',
  standalone: true,
  imports: [],
  templateUrl: './calendar-hour.component.html',
  styleUrl: './calendar-hour.component.scss',
})
export class CalendarHourComponent {
  @Input({ required: true }) hour!: number;
}
