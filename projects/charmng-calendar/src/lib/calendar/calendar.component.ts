import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';
import { CalendarDay as CalendarMonthDay } from '../interfaces/month-view/calendar.day';
import { CalendarDayComponent } from './calendar-day/calendar-day.component';
import { MonthEnum } from '../enums/months.enums';

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
  lastDayOfMonth: Date = new Date(this.currentYear, this.currentMonth + 1, 0);

  //Selected data
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

  ngOnInit(): void {
    this.initCalendarDays();
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
        currentMonth: true,
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
          currentMonth: false,
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
}
