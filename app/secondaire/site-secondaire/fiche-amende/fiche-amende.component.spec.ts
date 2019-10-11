import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheAmendeComponent } from './fiche-amende.component';

describe('FicheAmendeComponent', () => {
  let component: FicheAmendeComponent;
  let fixture: ComponentFixture<FicheAmendeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheAmendeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheAmendeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
