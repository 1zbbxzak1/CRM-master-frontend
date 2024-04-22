import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatePreviewComponent } from './template-preview.component';

describe('TemplatePreviewComponent', () => {
  let component: TemplatePreviewComponent;
  let fixture: ComponentFixture<TemplatePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplatePreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplatePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
