import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareStatusComponent } from './hardware-status.component';

describe('HardwareStatusComponent', () => {
  let component: HardwareStatusComponent;
  let fixture: ComponentFixture<HardwareStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardwareStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwareStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
