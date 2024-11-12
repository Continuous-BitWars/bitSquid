import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaguesPageComponent } from './leagues-page.component';

describe('LeaguesPageComponent', () => {
  let component: LeaguesPageComponent;
  let fixture: ComponentFixture<LeaguesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaguesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaguesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
