import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmCardComponent } from './crm-card.component';

describe('CrmCardComponent', () => {
  let component: CrmCardComponent;
  let fixture: ComponentFixture<CrmCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrmCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrmCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
