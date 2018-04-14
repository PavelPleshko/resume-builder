import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSingleComponent } from './color-single.component';

describe('ColorSingleComponent', () => {
  let component: ColorSingleComponent;
  let fixture: ComponentFixture<ColorSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
