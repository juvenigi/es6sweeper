import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SweeperMenuComponent} from './sweeper-menu.component';

describe('SweeperMenuComponent', () => {
  let component: SweeperMenuComponent;
  let fixture: ComponentFixture<SweeperMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SweeperMenuComponent]
    })
        .compileComponents();

    fixture = TestBed.createComponent(SweeperMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
