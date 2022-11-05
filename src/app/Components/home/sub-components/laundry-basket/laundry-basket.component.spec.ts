import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundryBasketComponent } from './laundry-basket.component';

describe('LaundryBasketComponent', () => {
  let component: LaundryBasketComponent;
  let fixture: ComponentFixture<LaundryBasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaundryBasketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaundryBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
