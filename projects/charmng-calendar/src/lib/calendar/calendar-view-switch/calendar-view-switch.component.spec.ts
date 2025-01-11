import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarViewSwitchComponent } from './calendar-view-switch.component';

describe('CalendarViewSwitchComponent', () => {
  let component: CalendarViewSwitchComponent;
  let fixture: ComponentFixture<CalendarViewSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarViewSwitchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarViewSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
