import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhGiaSanPhamComponent } from './danh-gia-san-pham.component';

describe('DanhGiaSanPhamComponent', () => {
  let component: DanhGiaSanPhamComponent;
  let fixture: ComponentFixture<DanhGiaSanPhamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DanhGiaSanPhamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DanhGiaSanPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
