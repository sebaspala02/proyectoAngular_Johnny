import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsCSVComponent } from './reports-csv.component';

describe('ReportsCSVComponent', () => {
  let component: ReportsCSVComponent;
  let fixture: ComponentFixture<ReportsCSVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsCSVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsCSVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
