import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietBanhTrungThuComponent } from './chi-tiet-banh-trung-thu.component';

describe('ChiTietBanhTrungThuComponent', () => {
  let component: ChiTietBanhTrungThuComponent;
  let fixture: ComponentFixture<ChiTietBanhTrungThuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChiTietBanhTrungThuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChiTietBanhTrungThuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
