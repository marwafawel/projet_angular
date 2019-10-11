import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueAffectationComponent } from './historique-affectation.component';

describe('HistoriqueAffectationComponent', () => {
  let component: HistoriqueAffectationComponent;
  let fixture: ComponentFixture<HistoriqueAffectationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriqueAffectationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueAffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
