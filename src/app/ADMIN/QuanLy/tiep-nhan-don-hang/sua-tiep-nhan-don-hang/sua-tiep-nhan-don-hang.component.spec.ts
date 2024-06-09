import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuaTiepNhanDonHangComponent } from './sua-tiep-nhan-don-hang.component';

describe('SuaTiepNhanDonHangComponent', () => {
  let component: SuaTiepNhanDonHangComponent;
  let fixture: ComponentFixture<SuaTiepNhanDonHangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuaTiepNhanDonHangComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuaTiepNhanDonHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
