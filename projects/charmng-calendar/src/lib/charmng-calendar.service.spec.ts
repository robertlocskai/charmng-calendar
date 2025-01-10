import { TestBed } from '@angular/core/testing';

import { CharmngCalendarService } from './charmng-calendar.service';

describe('CharmngCalendarService', () => {
  let service: CharmngCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharmngCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
