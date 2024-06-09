import { TestBed } from '@angular/core/testing';

import { DonHangChiTietService } from './don-hang-chi-tiet.service';

describe('DonHangChiTietService', () => {
  let service: DonHangChiTietService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonHangChiTietService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
