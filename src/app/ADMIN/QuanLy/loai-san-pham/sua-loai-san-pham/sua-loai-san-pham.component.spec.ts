import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuaLoaiSanPhamComponent } from './sua-loai-san-pham.component';

describe('SuaLoaiSanPhamComponent', () => {
  let component: SuaLoaiSanPhamComponent;
  let fixture: ComponentFixture<SuaLoaiSanPhamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuaLoaiSanPhamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuaLoaiSanPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
