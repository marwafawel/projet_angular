import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixSiteComponent } from './choix-site.component';

describe('ChoixSiteComponent', () => {
  let component: ChoixSiteComponent;
  let fixture: ComponentFixture<ChoixSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoixSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoixSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
