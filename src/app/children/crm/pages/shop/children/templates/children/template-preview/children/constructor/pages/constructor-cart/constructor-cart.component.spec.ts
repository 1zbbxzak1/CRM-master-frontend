import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructorCartComponent } from './constructor-cart.component';

describe('ConstructorCartComponent', () => {
  let component: ConstructorCartComponent;
  let fixture: ComponentFixture<ConstructorCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConstructorCartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConstructorCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
