import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelElementsComponent } from './side-panel-elements.component';

describe('SidePanelElementsComponent', () => {
  let component: SidePanelElementsComponent;
  let fixture: ComponentFixture<SidePanelElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidePanelElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidePanelElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
