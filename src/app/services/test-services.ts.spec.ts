import { TestBed } from '@angular/core/testing';

import { TestServicesTs } from './test-services.ts';

describe('TestServicesTs', () => {
  let service: TestServicesTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestServicesTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
