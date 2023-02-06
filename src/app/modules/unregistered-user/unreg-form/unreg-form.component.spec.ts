import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregFormComponent } from './unreg-form.component';

describe('UnregFormComponent', () => {
  let component: UnregFormComponent;
  let fixture: ComponentFixture<UnregFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnregFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnregFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
