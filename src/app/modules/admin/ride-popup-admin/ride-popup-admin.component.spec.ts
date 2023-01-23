import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidePopupAdminComponent } from './ride-popup-admin.component';

describe('RidePopupAdminComponent', () => {
  let component: RidePopupAdminComponent;
  let fixture: ComponentFixture<RidePopupAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RidePopupAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RidePopupAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
