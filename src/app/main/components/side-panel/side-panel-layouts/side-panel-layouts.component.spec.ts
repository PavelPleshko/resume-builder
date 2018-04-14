import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelLayoutsComponent } from './side-panel-layouts.component';

describe('SidePanelLayoutsComponent', () => {
  let component: SidePanelLayoutsComponent;
  let fixture: ComponentFixture<SidePanelLayoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidePanelLayoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidePanelLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
