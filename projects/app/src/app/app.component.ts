import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharmngCalendarModule } from '../../../charmng-calendar/src/public-api';
import { BehaviorSubject, Observable } from 'rxjs';
import { CalendarEvent } from '../../../charmng-calendar/src/lib/interfaces/calendar.event.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CharmngCalendarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  events$: BehaviorSubject<CalendarEvent[]> = new BehaviorSubject<
    CalendarEvent[]
  >([]);
  events: Observable<CalendarEvent[]> = this.events$.asObservable();

  ngOnInit(): void {
    this.events$.next([
      ...this.events$.getValue(),
      {
        name: 'a blue event',
        allDay: true,
        startDate: new Date(),
        color: 'blue',
      },
    ]);
    this.events$.next([
      ...this.events$.getValue(),
      {
        name: 'a purple event',
        allDay: true,
        startDate: new Date(),
        color: 'purple',
      },
    ]);
    this.events$.next([
      ...this.events$.getValue(),
      {
        name: 'a red event',
        allDay: true,
        startDate: new Date(),
        color: 'red',
      },
    ]);
    this.events$.next([
      ...this.events$.getValue(),
      { name: 'just an event :)', allDay: true, startDate: new Date() },
    ]);
    this.events$.next([
      ...this.events$.getValue(),
      {
        name: 'orange event',
        allDay: true,
        startDate: new Date(),
        color: 'orange',
      },
    ]);
    this.events$.next([
      ...this.events$.getValue(),
      {
        name: 'green event',
        allDay: true,
        startDate: new Date(),
        color: 'green',
      },
    ]);
    this.events$.next([
      ...this.events$.getValue(),
      {
        name: 'Just an event :)',
        allDay: true,
        startDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          24
        ),
      },
    ]);

    this.events$.next([
      ...this.events$.getValue(),
      {
        name: 'Just an event :)',
        allDay: false,
        startDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          new Date().getHours(),
          new Date().getMinutes()
        ),
        endDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          new Date().getHours() + 1,
          new Date().getMinutes()
        ),
      },
    ]);

    this.events$.next([
      ...this.events$.getValue(),
      {
        name: 'another :)',
        allDay: true,
        startDate: new Date(),
      },
    ]);

    this.events$.next([
      ...this.events$.getValue(),
      {
        name: 'A purple event',
        color: 'purple',
        allDay: false,
        startDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          14
        ),
        endDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          16
        ),
      },
    ]);
    this.events$.next([
      ...this.events$.getValue(),
      {
        name: 'A purple event',
        color: 'purple',
        allDay: false,
        startDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + 1,
          14
        ),
        endDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + 1,
          16
        ),
      },
    ]);
    this.events$.next([
      ...this.events$.getValue(),
      {
        name: 'A purple event',
        color: 'purple',
        allDay: false,
        startDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + 3,
          14
        ),
        endDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + 3,
          16
        ),
      },
    ]);

    this.events$.next([
      ...this.events$.getValue(),
      {
        name: 'A red event',
        allDay: false,
        color: 'red',
        startDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          9
        ),
        endDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate(),
          13
        ),
      },
    ]);
  }
}
