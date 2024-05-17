import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemLoaiSanPhamComponent } from './them-loai-san-pham.component';

describe('ThemLoaiSanPhamComponent', () => {
  let component: ThemLoaiSanPhamComponent;
  let fixture: ComponentFixture<ThemLoaiSanPhamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThemLoaiSanPhamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThemLoaiSanPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
