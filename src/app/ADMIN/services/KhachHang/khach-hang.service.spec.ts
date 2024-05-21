import { TestBed } from '@angular/core/testing';

import { KhachHangService } from './khach-hang.service';

describe('KhachHangService', () => {
  let service: KhachHangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KhachHangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
