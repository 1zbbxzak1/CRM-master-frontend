import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPhotosComponent } from './product-photos.component';

describe('ProductPhotosComponent', () => {
  let component: ProductPhotosComponent;
  let fixture: ComponentFixture<ProductPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductPhotosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
