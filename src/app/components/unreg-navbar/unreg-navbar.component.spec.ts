import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregNavbarComponent } from './unreg-navbar.component';

describe('UnregNavbarComponent', () => {
  let component: UnregNavbarComponent;
  let fixture: ComponentFixture<UnregNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnregNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnregNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
