import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMapsComponent } from './page-maps.component';

describe('PageMapsComponent', () => {
  let component: PageMapsComponent;
  let fixture: ComponentFixture<PageMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageMapsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
