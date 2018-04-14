import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomColorPickerComponent } from './custom-color-picker.component';

describe('CustomColorPickerComponent', () => {
  let component: CustomColorPickerComponent;
  let fixture: ComponentFixture<CustomColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomColorPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
