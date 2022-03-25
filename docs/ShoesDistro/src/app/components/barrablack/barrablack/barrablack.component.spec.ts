import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarrablackComponent } from './barrablack.component';

describe('BarrablackComponent', () => {
  let component: BarrablackComponent;
  let fixture: ComponentFixture<BarrablackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarrablackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarrablackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
