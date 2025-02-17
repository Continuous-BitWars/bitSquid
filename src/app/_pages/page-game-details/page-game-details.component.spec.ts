import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGameDetailsComponent } from './page-game-details.component';

describe('PageGameDetailsComponent', () => {
  let component: PageGameDetailsComponent;
  let fixture: ComponentFixture<PageGameDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageGameDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageGameDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
