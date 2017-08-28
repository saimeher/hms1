import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaserComponent } from './purchaser.component';

describe('PurchaserComponent', () => {
  let component: PurchaserComponent;
  let fixture: ComponentFixture<PurchaserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
