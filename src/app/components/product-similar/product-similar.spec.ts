import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSimilar } from './product-similar';

describe('ProductSimilar', () => {
  let component: ProductSimilar;
  let fixture: ComponentFixture<ProductSimilar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSimilar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSimilar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
