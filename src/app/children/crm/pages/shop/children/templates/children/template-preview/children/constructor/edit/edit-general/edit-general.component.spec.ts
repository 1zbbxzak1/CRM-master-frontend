import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGeneralComponent } from './edit-general.component';

describe('EditGeneralComponent', () => {
  let component: EditGeneralComponent;
  let fixture: ComponentFixture<EditGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
