import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverNextRidesComponent } from './driver-next-rides.component';

describe('DriverNextRidesComponent', () => {
  let component: DriverNextRidesComponent;
  let fixture: ComponentFixture<DriverNextRidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverNextRidesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverNextRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
