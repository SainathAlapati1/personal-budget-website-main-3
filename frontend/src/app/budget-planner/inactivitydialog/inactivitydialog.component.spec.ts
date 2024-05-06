import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactivitydialogComponent } from './inactivitydialog.component';

describe('InactivitydialogComponent', () => {
  let component: InactivitydialogComponent;
  let fixture: ComponentFixture<InactivitydialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InactivitydialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InactivitydialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
