import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDriverPageComponent } from './admin-driver-page.component';

describe('AdminDriverPageComponent', () => {
  let component: AdminDriverPageComponent;
  let fixture: ComponentFixture<AdminDriverPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDriverPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDriverPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
