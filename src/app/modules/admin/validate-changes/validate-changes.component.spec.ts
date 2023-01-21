import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateChangesComponent } from './validate-changes.component';

describe('ValidateChangesComponent', () => {
  let component: ValidateChangesComponent;
  let fixture: ComponentFixture<ValidateChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateChangesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
