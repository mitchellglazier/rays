import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HitterComponent } from './hitter.component';

describe('HitterComponent', () => {
  let component: HitterComponent;
  let fixture: ComponentFixture<HitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HitterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
