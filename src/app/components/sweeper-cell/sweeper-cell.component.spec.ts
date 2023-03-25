import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SweeperCellComponent} from './sweeper-cell.component';

describe('SweeperCellComponent', () => {
  let component: SweeperCellComponent;
  let fixture: ComponentFixture<SweeperCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SweeperCellComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SweeperCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
