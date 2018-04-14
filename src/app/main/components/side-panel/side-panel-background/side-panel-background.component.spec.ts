import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelBackgroundComponent } from './side-panel-background.component';

describe('SidePanelBackgroundComponent', () => {
  let component: SidePanelBackgroundComponent;
  let fixture: ComponentFixture<SidePanelBackgroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidePanelBackgroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidePanelBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
