import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarDay } from '../../interfaces/month-view/calendar.day';
import { CommonModule } from '@angular/common';
import { CalendarEvent } from '../../interfaces/calendar.event.interface';

@Component({
  selector: 'lib-calendar-day',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-day.component.html',
  styleUrl: './calendar-day.component.scss',
})
export class CalendarDayComponent {
  @Output() dayClicked: EventEmitter<Date> = new EventEmitter<Date>();
  @Input({ required: true }) calendarDay!: CalendarDay;
  @Input() events: CalendarEvent[] = [];
}
