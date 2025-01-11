import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CalendarMode } from '../calendar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-calendar-view-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-view-switch.component.html',
  styleUrl: './calendar-view-switch.component.scss',
})
export class CalendarViewSwitchComponent implements OnInit {
  @Output() modeChanged: EventEmitter<CalendarMode> =
    new EventEmitter<CalendarMode>();
  @Input({ required: true }) calendarMode!: Observable<CalendarMode>;
  mode!: CalendarMode;

  ngOnInit(): void {
    this.calendarMode.subscribe((mode) => (this.mode = mode));
  }

  changeMode(mode: CalendarMode) {
    if (mode != this.mode) {
      this.modeChanged.emit(mode);
    }
  }
}
