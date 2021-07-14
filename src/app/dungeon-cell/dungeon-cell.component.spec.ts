import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DungeonCellComponent } from './dungeon-cell.component';

describe('DungeonCellComponent', () => {
  let component: DungeonCellComponent;
  let fixture: ComponentFixture<DungeonCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DungeonCellComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DungeonCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
