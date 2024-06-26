import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveModalComponent } from './archive-modal.component';

describe('ArchiveModalComponent', () => {
  let component: ArchiveModalComponent;
  let fixture: ComponentFixture<ArchiveModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchiveModalComponent]
    });
    fixture = TestBed.createComponent(ArchiveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
