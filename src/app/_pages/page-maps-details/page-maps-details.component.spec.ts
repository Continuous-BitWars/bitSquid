import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMapsDetailsComponent } from './page-maps-details.component';

describe('PageMapsDetailsComponent', () => {
  let component: PageMapsDetailsComponent;
  let fixture: ComponentFixture<PageMapsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageMapsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageMapsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
