import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsomComponent } from './osom.component';

describe('OsomComponent', () => {
  let component: OsomComponent;
  let fixture: ComponentFixture<OsomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OsomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
