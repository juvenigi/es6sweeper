import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SweeperBoardComponent} from './sweeper-board.component';

describe('SweeperBoardComponent', () => {
  let component: SweeperBoardComponent;
  let fixture: ComponentFixture<SweeperBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SweeperBoardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SweeperBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
