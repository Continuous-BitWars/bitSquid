import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePlayerComponent } from './page-player.component';

describe('PagePlayerComponent', () => {
  let component: PagePlayerComponent;
  let fixture: ComponentFixture<PagePlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagePlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
