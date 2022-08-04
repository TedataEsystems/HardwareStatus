import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptStateComponent } from './receipt-state.component';

describe('ReceiptStateComponent', () => {
  let component: ReceiptStateComponent;
  let fixture: ComponentFixture<ReceiptStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiptStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
