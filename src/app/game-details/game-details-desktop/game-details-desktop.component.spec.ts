import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailsDesktopComponent } from './game-details-desktop.component';

describe('GameDetailsDesktopComponent', () => {
  let component: GameDetailsDesktopComponent;
  let fixture: ComponentFixture<GameDetailsDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameDetailsDesktopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDetailsDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
