import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionAmendeComponent } from './reception-amende.component';

describe('ReceptionAmendeComponent', () => {
  let component: ReceptionAmendeComponent;
  let fixture: ComponentFixture<ReceptionAmendeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptionAmendeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionAmendeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
