import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPanelComponent } from './work-panel.component';

describe('WorkPanelComponent', () => {
  let component: WorkPanelComponent;
  let fixture: ComponentFixture<WorkPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
