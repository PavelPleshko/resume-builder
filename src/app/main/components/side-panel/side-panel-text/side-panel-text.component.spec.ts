import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelTextComponent } from './side-panel-text.component';

describe('SidePanelTextComponent', () => {
  let component: SidePanelTextComponent;
  let fixture: ComponentFixture<SidePanelTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidePanelTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidePanelTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
