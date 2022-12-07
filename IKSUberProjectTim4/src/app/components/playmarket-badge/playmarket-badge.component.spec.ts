import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaymarketBadge } from './playmarket-badge.component';

describe('DummyComponent', () => {
  let component: PlaymarketBadge;
  let fixture: ComponentFixture<PlaymarketBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaymarketBadge ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaymarketBadge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});