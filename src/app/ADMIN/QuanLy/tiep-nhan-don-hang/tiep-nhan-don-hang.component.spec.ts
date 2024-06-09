import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiepNhanDonHangComponent } from './tiep-nhan-don-hang.component';

describe('TiepNhanDonHangComponent', () => {
  let component: TiepNhanDonHangComponent;
  let fixture: ComponentFixture<TiepNhanDonHangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TiepNhanDonHangComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TiepNhanDonHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
