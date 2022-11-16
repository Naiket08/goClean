import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningCycleComponent } from './cleaning-cycle.component';

describe('CleaningCycleComponent', () => {
  let component: CleaningCycleComponent;
  let fixture: ComponentFixture<CleaningCycleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleaningCycleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CleaningCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
