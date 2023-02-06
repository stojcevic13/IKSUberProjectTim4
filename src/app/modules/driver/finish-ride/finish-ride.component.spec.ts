import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishRideComponent } from './finish-ride.component';

describe('FinishRideComponent', () => {
  let component: FinishRideComponent;
  let fixture: ComponentFixture<FinishRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishRideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
