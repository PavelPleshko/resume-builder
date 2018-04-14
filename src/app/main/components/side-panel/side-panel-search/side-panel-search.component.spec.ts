import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelSearchComponent } from './side-panel-search.component';

describe('SidePanelSearchComponent', () => {
  let component: SidePanelSearchComponent;
  let fixture: ComponentFixture<SidePanelSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidePanelSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidePanelSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
