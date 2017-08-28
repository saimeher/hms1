import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesteryComponent } from './semestery.component';

describe('SemesteryComponent', () => {
  let component: SemesteryComponent;
  let fixture: ComponentFixture<SemesteryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemesteryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemesteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
