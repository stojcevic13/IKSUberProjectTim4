import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockRemarksComponent } from './block-remarks.component';

describe('BlockRemarksComponent', () => {
  let component: BlockRemarksComponent;
  let fixture: ComponentFixture<BlockRemarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockRemarksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
