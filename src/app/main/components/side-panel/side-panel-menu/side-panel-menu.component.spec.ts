import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelMenuComponent } from './side-panel-menu.component';

describe('SidePanelMenuComponent', () => {
  let component: SidePanelMenuComponent;
  let fixture: ComponentFixture<SidePanelMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidePanelMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidePanelMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
