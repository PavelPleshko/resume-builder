import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCanvasElementComponent } from './content-canvas-element.component';

describe('ContentCanvasElementComponent', () => {
  let component: ContentCanvasElementComponent;
  let fixture: ComponentFixture<ContentCanvasElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentCanvasElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentCanvasElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
