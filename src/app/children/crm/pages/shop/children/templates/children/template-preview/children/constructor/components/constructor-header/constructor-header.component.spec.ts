import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructorHeaderComponent } from './constructor-header.component';

describe('ConstructorHeaderComponent', () => {
  let component: ConstructorHeaderComponent;
  let fixture: ComponentFixture<ConstructorHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConstructorHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConstructorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
