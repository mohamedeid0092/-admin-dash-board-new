import { TestBed } from '@angular/core/testing';

import { Api3Service } from './api3.service';

describe('Api3Service', () => {
  let service: Api3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Api3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
