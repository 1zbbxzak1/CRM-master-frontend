import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressOrdersComponent } from './progress-orders.component';

describe('ProgressOrdersComponent', () => {
  let component: ProgressOrdersComponent;
  let fixture: ComponentFixture<ProgressOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgressOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
