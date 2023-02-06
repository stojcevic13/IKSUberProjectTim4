import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidePopupDriverComponent } from './ride-popup-driver.component';

describe('RidePopupDriverComponent', () => {
  let component: RidePopupDriverComponent;
  let fixture: ComponentFixture<RidePopupDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RidePopupDriverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RidePopupDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
