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

  calculateStartPercentage(eventStartTime: Date): number {
    const totalMinutesPastMidnight =
      eventStartTime.getHours() * 60 + eventStartTime.getMinutes();

    const percentage = (totalMinutesPastMidnight / (24 * 60)) * 100;

    return percentage;
  }

  calculateHeightPercentage(eventStartTime: Date, eventEndTime: Date) {
    const startTotalMinutes =
      eventStartTime.getHours() * 60 + eventStartTime.getMinutes();
    const endTotalMinutes =
      eventEndTime.getHours() * 60 + eventEndTime.getMinutes();

    const eventDuration = endTotalMinutes - startTotalMinutes;
    return (eventDuration / (24 * 60)) * 100;
  }
}
