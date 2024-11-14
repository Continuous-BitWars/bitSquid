import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBoxComponent } from './game-box.component';

describe('GameBoxComponent', () => {
  let component: GameBoxComponent;
  let fixture: ComponentFixture<GameBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
