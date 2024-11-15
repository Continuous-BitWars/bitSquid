import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailsMobileComponent } from './game-details-mobile.component';

describe('GameDetailsMobileComponent', () => {
  let component: GameDetailsMobileComponent;
  let fixture: ComponentFixture<GameDetailsMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameDetailsMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDetailsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
