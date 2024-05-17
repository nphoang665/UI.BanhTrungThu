import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanPhamHomeComponent } from './san-pham-home.component';

describe('SanPhamHomeComponent', () => {
  let component: SanPhamHomeComponent;
  let fixture: ComponentFixture<SanPhamHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SanPhamHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SanPhamHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
