import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseExamTypeComponent } from './choose-exam-type.component';

describe('ChooseExamTypeComponent', () => {
  let component: ChooseExamTypeComponent;
  let fixture: ComponentFixture<ChooseExamTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseExamTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseExamTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
