import { TestBed } from '@angular/core/testing';

import { EmployeedetailsService } from './employeedetails.service';

describe('EmployeedetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeedetailsService = TestBed.get(EmployeedetailsService);
    expect(service).toBeTruthy();
  });
});
