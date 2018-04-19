import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementMenuSingleComponent } from './element-menu-single.component';

describe('ElementMenuSingleComponent', () => {
  let component: ElementMenuSingleComponent;
  let fixture: ComponentFixture<ElementMenuSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementMenuSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementMenuSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
