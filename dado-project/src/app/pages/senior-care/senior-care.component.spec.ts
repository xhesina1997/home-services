import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeniorCareComponent } from './senior-care.component';

describe('SeniorCareComponent', () => {
  let component: SeniorCareComponent;
  let fixture: ComponentFixture<SeniorCareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeniorCareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeniorCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
