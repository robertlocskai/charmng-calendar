import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharmngCalendarComponent } from './charmng-calendar.component';

describe('CharmngCalendarComponent', () => {
  let component: CharmngCalendarComponent;
  let fixture: ComponentFixture<CharmngCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharmngCalendarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CharmngCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
