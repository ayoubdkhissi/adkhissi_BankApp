import { TestBed } from '@angular/core/testing';

import { CustomerValidationService } from './customer-validation.service';

describe('CustomerValidationService', () => {
  let service: CustomerValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
