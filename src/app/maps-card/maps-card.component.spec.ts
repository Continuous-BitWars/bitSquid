import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsCardComponent } from './maps-card.component';

describe('MapsCardComponent', () => {
  let component: MapsCardComponent;
  let fixture: ComponentFixture<MapsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
