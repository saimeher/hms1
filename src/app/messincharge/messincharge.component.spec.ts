import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessinchargeComponent } from './messincharge.component';

describe('MessinchargeComponent', () => {
  let component: MessinchargeComponent;
  let fixture: ComponentFixture<MessinchargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessinchargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessinchargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
