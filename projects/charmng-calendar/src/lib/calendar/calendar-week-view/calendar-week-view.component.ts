import { Component, Input, OnInit } from '@angular/core';
import { CalendarDay } from '../../interfaces/month-view/calendar.day';
import { CalendarDayViewComponent } from '../calendar-day-view/calendar-day-view.component';
import { CalendarEvent } from '../../interfaces/calendar.event.interface';
import { CalendarHourComponent } from '../calendar-hour/calendar-hour.component';

@Component({
  selector: 'lib-calendar-week-view',
  standalone: true,
  imports: [CalendarDayViewComponent, CalendarHourComponent],
  templateUrl: './calendar-week-view.component.html',
  styleUrl: './calendar-week-view.component.css',
})
export class CalendarWeekViewComponent {
  @Input({ required: true }) days!: Date[];
  @Input() weekEvents: CalendarEvent[] = [];

  getEventsForDay(day: CalendarDay): CalendarEvent[] {
    return this.weekEvents.filter((event) =>
      this.isSameDate(event.startDate, day.date)
    );
  }

  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}
