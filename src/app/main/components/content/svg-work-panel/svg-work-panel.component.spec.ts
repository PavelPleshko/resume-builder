import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgWorkPanelComponent } from './svg-work-panel.component';

describe('SvgWorkPanelComponent', () => {
  let component: SvgWorkPanelComponent;
  let fixture: ComponentFixture<SvgWorkPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgWorkPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgWorkPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
