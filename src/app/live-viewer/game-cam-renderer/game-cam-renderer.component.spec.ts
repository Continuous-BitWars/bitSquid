import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCamRendererComponent } from './game-cam-renderer.component';

describe('GameCamRendererComponent', () => {
  let component: GameCamRendererComponent;
  let fixture: ComponentFixture<GameCamRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameCamRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameCamRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
