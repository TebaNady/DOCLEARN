import { Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-exam-type',
  templateUrl: './choose-exam-type.component.html',
  styleUrls: ['./choose-exam-type.component.css']
})
export class ChooseExamTypeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  selectExam(examType: string): void {
    if (examType === 'final') {
      this.router.navigate(['/exam']);
    } else if (examType === 'end-round') {
      this.router.navigate(['/exam-end-round']);
    }
  }

}
