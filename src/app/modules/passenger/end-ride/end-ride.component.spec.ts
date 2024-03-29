import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndRideComponent } from './end-ride.component';

describe('EndRideComponent', () => {
  let component: EndRideComponent;
  let fixture: ComponentFixture<EndRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndRideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
