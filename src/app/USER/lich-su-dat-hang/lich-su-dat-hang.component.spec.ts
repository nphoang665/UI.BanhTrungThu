import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LichSuDatHangComponent } from './lich-su-dat-hang.component';

describe('LichSuDatHangComponent', () => {
  let component: LichSuDatHangComponent;
  let fixture: ComponentFixture<LichSuDatHangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LichSuDatHangComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LichSuDatHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
