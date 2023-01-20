import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclineReasonComponent } from './decline-reason.component';

describe('DeclineReasonComponent', () => {
  let component: DeclineReasonComponent;
  let fixture: ComponentFixture<DeclineReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclineReasonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeclineReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
