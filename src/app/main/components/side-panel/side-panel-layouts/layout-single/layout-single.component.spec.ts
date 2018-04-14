import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutSingleComponent } from './layout-single.component';

describe('LayoutSingleComponent', () => {
  let component: LayoutSingleComponent;
  let fixture: ComponentFixture<LayoutSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
