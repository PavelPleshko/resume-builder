import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextElementsListComponent } from './text-elements-list.component';

describe('TextElementsListComponent', () => {
  let component: TextElementsListComponent;
  let fixture: ComponentFixture<TextElementsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextElementsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextElementsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
