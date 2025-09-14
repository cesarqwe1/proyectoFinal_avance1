import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProductRecommend } from './home-product-recommend';

describe('HomeProductRecommend', () => {
  let component: HomeProductRecommend;
  let fixture: ComponentFixture<HomeProductRecommend>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeProductRecommend]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeProductRecommend);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
