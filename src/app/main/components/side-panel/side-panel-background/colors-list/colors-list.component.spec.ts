import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorsListComponent } from './colors-list.component';

describe('ColorsListComponent', () => {
  let component: ColorsListComponent;
  let fixture: ComponentFixture<ColorsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
