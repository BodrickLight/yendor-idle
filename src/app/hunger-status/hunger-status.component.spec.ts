import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HungerStatusComponent } from './hunger-status.component';

describe('HungerStatusComponent', () => {
  let component: HungerStatusComponent;
  let fixture: ComponentFixture<HungerStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HungerStatusComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HungerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
