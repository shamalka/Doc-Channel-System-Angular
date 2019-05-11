import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PfooterComponent } from './pfooter.component';

describe('PfooterComponent', () => {
  let component: PfooterComponent;
  let fixture: ComponentFixture<PfooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PfooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
