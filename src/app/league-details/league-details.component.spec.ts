import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueDetailsComponent } from './league-details.component';

describe('LeagueDetailsComponent', () => {
  let component: LeagueDetailsComponent;
  let fixture: ComponentFixture<LeagueDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeagueDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeagueDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
