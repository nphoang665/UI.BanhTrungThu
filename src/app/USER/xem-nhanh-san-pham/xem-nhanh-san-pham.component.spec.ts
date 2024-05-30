import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XemNhanhSanPhamComponent } from './xem-nhanh-san-pham.component';

describe('XemNhanhSanPhamComponent', () => {
  let component: XemNhanhSanPhamComponent;
  let fixture: ComponentFixture<XemNhanhSanPhamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [XemNhanhSanPhamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(XemNhanhSanPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
