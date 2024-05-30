import { TestBed } from '@angular/core/testing';

import { BeService } from './be-service.service';

describe('DbServiceService', () => {
  let service: BeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
