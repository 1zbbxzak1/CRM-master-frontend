import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStageComponent } from './add-stage.component';

describe('AddStageComponent', () => {
  let component: AddStageComponent;
  let fixture: ComponentFixture<AddStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddStageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
