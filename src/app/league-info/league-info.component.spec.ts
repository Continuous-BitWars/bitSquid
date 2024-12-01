import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueInfoComponent } from './league-info.component';

describe('LeagueInfoComponent', () => {
  let component: LeagueInfoComponent;
  let fixture: ComponentFixture<LeagueInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeagueInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeagueInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
