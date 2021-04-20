import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationalDialogComponent } from './informational-dialog.component';

describe('InformationalDialogComponent', () => {
  let component: InformationalDialogComponent;
  let fixture: ComponentFixture<InformationalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
