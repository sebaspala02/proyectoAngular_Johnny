import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsC3Component } from './reports-c3.component';

describe('ReportsC3Component', () => {
  let component: ReportsC3Component;
  let fixture: ComponentFixture<ReportsC3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsC3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsC3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
