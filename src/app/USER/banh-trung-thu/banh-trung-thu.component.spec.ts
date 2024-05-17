import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanhTrungThuComponent } from './banh-trung-thu.component';

describe('BanhTrungThuComponent', () => {
  let component: BanhTrungThuComponent;
  let fixture: ComponentFixture<BanhTrungThuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BanhTrungThuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BanhTrungThuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
