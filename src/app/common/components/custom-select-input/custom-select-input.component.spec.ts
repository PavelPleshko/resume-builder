import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSelectInputComponent } from './custom-select-input.component';

describe('CustomSelectInputComponent', () => {
  let component: CustomSelectInputComponent;
  let fixture: ComponentFixture<CustomSelectInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomSelectInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSelectInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
