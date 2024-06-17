import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XacNhanXoaComponent } from './xac-nhan-xoa.component';

describe('XacNhanXoaComponent', () => {
  let component: XacNhanXoaComponent;
  let fixture: ComponentFixture<XacNhanXoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [XacNhanXoaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(XacNhanXoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
