import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacakgeListComponent } from './pacakge-list.component';

describe('PacakgeListComponent', () => {
  let component: PacakgeListComponent;
  let fixture: ComponentFixture<PacakgeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacakgeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacakgeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
