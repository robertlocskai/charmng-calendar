import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarWeekViewComponent } from './calendar-week-view.component';

describe('CalendarWeekViewComponent', () => {
  let component: CalendarWeekViewComponent;
  let fixture: ComponentFixture<CalendarWeekViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarWeekViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarWeekViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
