import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutsListComponent } from './layouts-list.component';

describe('LayoutsListComponent', () => {
  let component: LayoutsListComponent;
  let fixture: ComponentFixture<LayoutsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
