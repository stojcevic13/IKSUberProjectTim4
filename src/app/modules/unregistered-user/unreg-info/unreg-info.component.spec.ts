import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregInfoComponent } from './unreg-info.component';

describe('UnregInfoComponent', () => {
  let component: UnregInfoComponent;
  let fixture: ComponentFixture<UnregInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnregInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnregInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
