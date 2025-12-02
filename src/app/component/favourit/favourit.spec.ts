import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Favourit } from './favourit';

describe('Favourit', () => {
  let component: Favourit;
  let fixture: ComponentFixture<Favourit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Favourit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Favourit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
