import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmCardEditComponent } from './crm-card-edit.component';

describe('CrmCardEditComponent', () => {
  let component: CrmCardEditComponent;
  let fixture: ComponentFixture<CrmCardEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrmCardEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrmCardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
