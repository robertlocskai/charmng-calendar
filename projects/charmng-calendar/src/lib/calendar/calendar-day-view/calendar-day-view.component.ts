import { Component, Input } from '@angular/core';
import { CalendarHourComponent } from '../calendar-hour/calendar-hour.component';
import { CalendarEvent } from '../../interfaces/calendar.event.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-calendar-day-view',
  standalone: true,
  imports: [CommonModule, CalendarHourComponent],
  templateUrl: './calendar-day-view.component.html',
  styleUrl: './calendar-day-view.component.scss',
})
export class CalendarDayViewComponent {
  @Input({ required: true }) day!: Date;
  @Input() events: CalendarEvent[] = [];
}
