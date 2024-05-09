import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessControlWebComponent } from './access-control-web.component';

describe('AccessControlWebComponent', () => {
  let component: AccessControlWebComponent;
  let fixture: ComponentFixture<AccessControlWebComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccessControlWebComponent]
    });
    fixture = TestBed.createComponent(AccessControlWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
