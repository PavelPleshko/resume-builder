import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementSingleComponent } from './element-single.component';

describe('ElementSingleComponent', () => {
  let component: ElementSingleComponent;
  let fixture: ComponentFixture<ElementSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
