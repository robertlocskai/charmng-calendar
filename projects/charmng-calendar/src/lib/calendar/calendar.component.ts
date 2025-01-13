import {
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import {
  CalendarDay,
  CalendarDay as CalendarMonthDay,
} from '../interfaces/month-view/calendar.day';
import { CalendarDayComponent } from './calendar-day/calendar-day.component';
import { MonthEnum } from '../enums/months.enums';
import { CalendarEvent } from '../interfaces/calendar.event.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { CalendarViewSwitchComponent } from './calendar-view-switch/calendar-view-switch.component';
import { CommonModule } from '@angular/common';
import { CalendarDayViewComponent } from './calendar-day-view/calendar-day-view.component';
import { CalendarWeekViewComponent } from './calendar-week-view/calendar-week-view.component';

export type CalendarMode = 'day' | 'week' | 'month' | 'year';

@Component({
  selector: 'CharmCalendar',
  standalone: true,
  imports: [
    CommonModule,
    CalendarDayComponent,
    CalendarDayViewComponent,
    CalendarViewSwitchComponent,
    CalendarWeekViewComponent,
  ],
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
  lastDayOfMonth: Date = new Date(this.currentYear, this.currentMonth + 1, 0);

  //Selected data
  selectedDate: Date = new Date(
    this.currentYear,
    this.currentMonth,
    this.currentDate.getDate()
  ); //This date is for day view
  selectedMonth: number = this.currentMonth;
  selectedYear: number = this.currentYear;
  firstDayOfSelectedMonth: Date = new Date(
    this.selectedYear,
    this.selectedMonth,
    1
  );
  firstDayOfSelectedMonthDay: number = this.firstDayOfMonth.getDay();
  lastDayOfSelectedMonth: Date = new Date(
    this.selectedYear,
    this.selectedMonth + 1,
    0
  );

  //User options (Inputs)
  @Input({ required: true }) events!: Observable<CalendarEvent[]>;

  //Generated blocks
  calendarDays!: CalendarMonthDay[];

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
  eventList: CalendarEvent[] = [];
  calendarMode$: BehaviorSubject<CalendarMode> =
    new BehaviorSubject<CalendarMode>('month');
  calendarMode: Observable<CalendarMode> = this.calendarMode$.asObservable();

  ngOnInit(): void {
    this.initCalendarDays();
    if (!this.events)
      throw new Error("You have to give an 'Events' observable!");
    this.events.subscribe((val) => (this.eventList = val));
  }

  initCalendarDays(): void {
    this.calendarDays = [];
    this.getPreviousDays();
    this.getCurrentDays();
  }

  getCurrentDays(): void {
    for (let i = 1; i <= this.lastDayOfSelectedMonth.getDate(); i++) {
      const date = new Date(this.selectedYear, this.selectedMonth, i);
      this.calendarDays.push({
        date: date,
        visible: true,
        active: true,
        isToday:
          this.currentDate.getDate() == date.getDate() &&
          this.currentMonth == date.getMonth() &&
          this.currentYear == date.getFullYear(),
      });
    }
  }

  getPreviousDays(): void {
    if (this.firstDayOfSelectedMonthDay != 1) {
      const lastDay = new Date(this.selectedYear, this.selectedMonth, 0);
      const daysToDisplay =
        this.firstDayOfSelectedMonthDay < 1
          ? 6
          : this.firstDayOfSelectedMonthDay - 1;

      for (let i = 0; i <= daysToDisplay - 1; i++) {
        const date = new Date(lastDay);

        date.setDate(lastDay.getDate() - (daysToDisplay - 1 - i));
        this.calendarDays.push({
          date: date,
          visible: false,
          active: false,
          isToday: false,
        });
      }
    }
  }

  nextMonth(): void {
    const selectedDate = new Date(this.selectedYear, this.selectedMonth + 1, 1);
    this.setSelectedData(selectedDate);
    this.initCalendarDays();
  }

  previousMonth(): void {
    const selectedDate = new Date(this.selectedYear, this.selectedMonth - 1, 1);
    this.setSelectedData(selectedDate);
    this.initCalendarDays();
  }

  previousDay(): void {
    this.selectedDate = new Date(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth(),
      this.selectedDate.getDate() - 1
    );
  }

  nextDay(): void {
    this.selectedDate = new Date(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth(),
      this.selectedDate.getDate() + 1
    );
  }

  setSelectedData(selectedDate: Date): void {
    this.selectedMonth = selectedDate.getMonth();
    this.selectedYear = selectedDate.getFullYear();
    this.firstDayOfSelectedMonth = new Date(
      this.selectedYear,
      this.selectedMonth,
      1
    );
    this.firstDayOfSelectedMonthDay = this.firstDayOfSelectedMonth.getDay();
    this.lastDayOfSelectedMonth = new Date(
      this.selectedYear,
      this.selectedMonth + 1,
      0
    );
  }

  getMonth(monthNumber: number): string {
    return MonthEnum[monthNumber];
  }

  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  getEventsForDay(day: CalendarDay): CalendarEvent[] {
    return this.eventList.filter((event) =>
      this.isSameDate(event.startDate, day.date)
    );
  }

  dayClicked(date: Date): void {
    this.selectedDate = date;
    this.calendarMode$.next('day');
  }

  currentWeekDates: Date[] = [];
  getWeekDays(): Date[] {
    const startOfWeek = 1;
    const selectedDay = this.selectedDate.getDay();
    const differenceToStart = (selectedDay - startOfWeek + 7) % 7;
    const startDate = new Date(this.selectedDate);
    startDate.setDate(this.selectedDate.getDate() - differenceToStart);

    const weekDates: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      weekDates.push(day);
    }
    this.currentWeekDates = weekDates;
    return weekDates;
  }

  getWeekEvents() {
    return this.eventList.filter((event) =>
      this.currentWeekDates.some((date) =>
        this.isSameDate(event.startDate, date)
      )
    );
  }
}
