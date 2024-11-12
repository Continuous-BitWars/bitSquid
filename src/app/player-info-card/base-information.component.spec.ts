import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BaseInformationComponent} from './base-information.component';

describe('PlayerInfoCardComponent', () => {
  let component: BaseInformationComponent;
  let fixture: ComponentFixture<BaseInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseInformationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BaseInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
