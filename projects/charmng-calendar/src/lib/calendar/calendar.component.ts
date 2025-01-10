import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';
import { CalendarDay as CalendarMonthDay } from '../interfaces/month-view/calendar.day';
import { CalendarDayComponent } from './calendar-day/calendar-day.component';

@Component({
  selector: 'CharmCalendar',
  standalone: true,
  imports: [CalendarDayComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
  @ContentChild('header') headerTemplate!: TemplateRef<any>;

  //Current data
  currentDate: Date = new Date();
  currentMonth: number = this.currentDate.getMonth();
  currentYear: number = this.currentDate.getFullYear();
  firstDayOfMonth: Date = new Date(this.currentYear, this.currentMonth, 1);
  firstDayOfMonthDay: number = this.firstDayOfMonth.getDay();
  lastDayOfMonth: Date = new Date(this.currentYear, this.currentMonth, 0);

  //User options (Inputs)

  //Generated blocks
  calendarDays: CalendarMonthDay[] = [];

  //Other data
  daysOfWeek: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  ngOnInit(): void {
    this.initCalendarDays();
  }

  initCalendarDays(): void {
    this.getPreviousDays();
    this.getCurrentDays();
  }

  getCurrentDays(): void {
    for (let i = 1; i <= this.lastDayOfMonth.getDate(); i++) {
      this.calendarDays.push({
        date: new Date(this.currentYear, this.currentMonth, i),
        visible: true,
        active: true,
        currentMonth: true,
      } as CalendarMonthDay);
    }
  }

  getPreviousDays(): void {
    if (this.firstDayOfMonthDay != 1) {
      const lastDay = new Date(this.currentYear, this.currentMonth, 0);
      const daysToDisplay =
        this.firstDayOfMonthDay < 1 ? 6 : this.firstDayOfMonthDay - 1;

      for (let i = 0; i <= daysToDisplay - 1; i++) {
        const date = new Date(lastDay);

        date.setDate(lastDay.getDate() - (daysToDisplay - 1 - i));
        console.log(date);
        this.calendarDays.push({
          date: date,
          visible: false,
          active: false,
          currentMonth: false,
        });
      }
    }
  }
}
