import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCanvasSvgComponent } from './content-canvas-svg.component';

describe('ContentCanvasSvgComponent', () => {
  let component: ContentCanvasSvgComponent;
  let fixture: ComponentFixture<ContentCanvasSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentCanvasSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentCanvasSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
