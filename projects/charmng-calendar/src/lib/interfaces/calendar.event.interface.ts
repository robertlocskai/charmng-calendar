type EventColor = 'red' | 'purple' | 'blue' | 'orange' | 'green';
export interface CalendarEvent {
  startDate: Date;
  endDate?: Date;
  name: string;
  allDay: boolean;
  color?: EventColor;
}
