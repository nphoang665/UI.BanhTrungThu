import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanPhamBanhTrungThuComponent } from './san-pham-banh-trung-thu.component';

describe('SanPhamBanhTrungThuComponent', () => {
  let component: SanPhamBanhTrungThuComponent;
  let fixture: ComponentFixture<SanPhamBanhTrungThuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SanPhamBanhTrungThuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SanPhamBanhTrungThuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
