import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipatorComponent } from './participator.component';

describe('ParticipatorComponent', () => {
  let component: ParticipatorComponent;
  let fixture: ComponentFixture<ParticipatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParticipatorComponent]
    });
    fixture = TestBed.createComponent(ParticipatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
