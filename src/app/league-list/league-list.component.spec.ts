import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueListComponent } from './league-list.component';

describe('LeagueListComponent', () => {
  let component: LeagueListComponent;
  let fixture: ComponentFixture<LeagueListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeagueListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeagueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
