import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifquestComponent } from './modifquest.component';

describe('ModifquestComponent', () => {
  let component: ModifquestComponent;
  let fixture: ComponentFixture<ModifquestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifquestComponent]
    });
    fixture = TestBed.createComponent(ModifquestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
