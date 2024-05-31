import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistoryStageComponent } from './order-history-stage.component';

describe('OrderHistoryStageComponent', () => {
  let component: OrderHistoryStageComponent;
  let fixture: ComponentFixture<OrderHistoryStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderHistoryStageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderHistoryStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
