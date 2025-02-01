import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestdetComponent } from './questdet.component';

describe('QuestdetComponent', () => {
  let component: QuestdetComponent;
  let fixture: ComponentFixture<QuestdetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestdetComponent]
    });
    fixture = TestBed.createComponent(QuestdetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
