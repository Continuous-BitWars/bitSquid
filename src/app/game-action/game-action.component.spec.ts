import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameActionComponent } from './game-action.component';

describe('GameActionComponent', () => {
  let component: GameActionComponent;
  let fixture: ComponentFixture<GameActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
