import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePlayerDetailsComponent } from './page-player-details.component';

describe('PagePlayerDetailsComponent', () => {
  let component: PagePlayerDetailsComponent;
  let fixture: ComponentFixture<PagePlayerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagePlayerDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagePlayerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
