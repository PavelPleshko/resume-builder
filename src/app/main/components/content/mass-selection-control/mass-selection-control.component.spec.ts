import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MassSelectionControlComponent } from './mass-selection-control.component';

describe('MassSelectionControlComponent', () => {
  let component: MassSelectionControlComponent;
  let fixture: ComponentFixture<MassSelectionControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MassSelectionControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MassSelectionControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
