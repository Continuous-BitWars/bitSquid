import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLeagueDetailsComponent } from './page-league-details.component';

describe('PageLeagueDetailsComponent', () => {
  let component: PageLeagueDetailsComponent;
  let fixture: ComponentFixture<PageLeagueDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageLeagueDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageLeagueDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
