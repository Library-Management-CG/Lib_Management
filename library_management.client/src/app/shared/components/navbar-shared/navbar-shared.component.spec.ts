import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSharedComponent } from './navbar-shared.component';

describe('NavbarSharedComponent', () => {
  let component: NavbarSharedComponent;
  let fixture: ComponentFixture<NavbarSharedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarSharedComponent]
    });
    fixture = TestBed.createComponent(NavbarSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
