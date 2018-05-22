import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedListSingleComponent } from './saved-list-single.component';

describe('SavedListSingleComponent', () => {
  let component: SavedListSingleComponent;
  let fixture: ComponentFixture<SavedListSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedListSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedListSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
