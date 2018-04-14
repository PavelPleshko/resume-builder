import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasWorkPanelComponent } from './canvas-work-panel.component';

describe('CanvasWorkPanelComponent', () => {
  let component: CanvasWorkPanelComponent;
  let fixture: ComponentFixture<CanvasWorkPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasWorkPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasWorkPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
