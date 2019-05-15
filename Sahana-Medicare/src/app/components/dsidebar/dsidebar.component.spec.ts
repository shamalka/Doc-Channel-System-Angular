import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsidebarComponent } from './dsidebar.component';

describe('DsidebarComponent', () => {
  let component: DsidebarComponent;
  let fixture: ComponentFixture<DsidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
