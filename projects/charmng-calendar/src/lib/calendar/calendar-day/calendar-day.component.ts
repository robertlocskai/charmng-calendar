import { Component, Input } from '@angular/core';
import { CalendarDay } from '../../interfaces/month-view/calendar.day';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-calendar-day',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-day.component.html',
  styleUrl: './calendar-day.component.scss',
})
export class CalendarDayComponent {
  @Input({ required: true }) calendarDay!: CalendarDay;
}
