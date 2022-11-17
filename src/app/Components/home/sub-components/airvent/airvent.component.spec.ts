import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirventComponent } from './airvent.component';

describe('AirventComponent', () => {
  let component: AirventComponent;
  let fixture: ComponentFixture<AirventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
