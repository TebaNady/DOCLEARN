import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { QuestionsService } from 'src/app/questions.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  questions !: any[]; // Array to hold questions
  currentPage: number = 0;
  pageSize: number = 2;
  correctAnswers !: number;
  totalQuestions: number = 0;
  score: number = 0;
  message: string = '';
  isPopupOpen: boolean = false;
  isLoading: boolean = false;
  token!: any
  payError: boolean = false

  constructor(private router: Router, private http: HttpClient, private service: QuestionsService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (!this.token) {
      console.error('Token not found in local storage');
      return;
    }
    this.service.getAllQuestions(this.token).subscribe(
      (questions) => {
        this.questions = questions as any[];
      },
      (error) => {
        this.payError = true
        console.log('Error fetching product details:', error);
      }
    );
    this.getQuestions()
    this.isLoading = true;
  }
  redirectToPayment(): void {
    // Assuming your payment page route is '/payment'
    this.router.navigateByUrl('/payment-final');
  }
  getQuestions() {
    this.service.getAllQuestions(this.token).subscribe((res: any) => {
      this.questions = res.questions.slice(0, 10);
      this.totalQuestions = this.questions.length;
      this.isLoading = false;
    },
      (error) => {
        console.error('Error fetching questions:', error.status);
        this.isLoading = false;
      }
    )
  }


  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.questions.length / this.pageSize);
  }

  getCurrentPageQuestions(): any[] {
    // if (!Array.isArray(this.questions)) {
    //   console.error('Questions data is not an array:', this.questions);
    //   return [];
    // }
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.questions.length);
    return this.questions.slice(startIndex, endIndex);
  }

  checkAnswer(question: any, selectedOption: string): void {
    // Only set the selected answer if the question doesn't already have one
    if (!question.selectedAnswer) {
      question.selectedAnswer = selectedOption;
    }
  }

  isAllQuestionsAnswered(): boolean {
    return this.questions.every(question => question.Answer !== undefined);
  }

  showResult(): void {
    // if (!Array.isArray(this.questions)) {
    //   console.error('Questions data is not an array:', this.questions);
    //   return;
    // }
    // Count the correct answers
    this.correctAnswers = this.questions.filter(question => question.selectedAnswer === question.Answer).length;

    // Calculate the total number of questions
    this.totalQuestions = this.questions.length;

    // Calculate the score
    this.score = (this.correctAnswers / this.totalQuestions) * 100;

    // Create the message to display
    this.message = `You answered ${this.correctAnswers} out of ${this.totalQuestions} questions correctly. Your result is ${this.score.toFixed(2)}%`;

    // Open the popup
    this.isPopupOpen = true;
  }

  // editPay(token: string): void {
  //   this.service.editPay(token).subscribe(
  //     (response) => {
  //       console.log('Edit Pay Successful', response);
  //     },
  //     (error) => {
  //       this.payError = true
  //       console.log('Error editing pay:', error);
  //     }
  //   );
  // }
  closePopup(): void {
    this.isLoading = true; // Show loading indicator
  
    this.service.editPay(this.token).subscribe(
      (response) => {
        // Edit pay successful
        console.log(response); // Log response for debugging
        this.isLoading = false; // Hide loading indicator
        this.isPopupOpen = false; // Close the popup
        localStorage.removeItem('token'); // Remove token from localStorage
        // Optionally, provide feedback to the user that payment editing was successful
        // Redirect to the login page
        this.router.navigateByUrl('/login');
      },
      (error) => {
        // Error editing pay
        this.isLoading = false; // Hide loading indicator
        console.error('Error editing pay:', error); // Log error for debugging
        // Handle error as needed, e.g., display an error message to the user
      }
    );
  }
  
  @HostListener('contextmenu', ['$event'])
  onRightClick(event: Event): void {
    event.preventDefault();
    alert('You cannot copy or print the exam :D')
  }

  // Prevent keyboard shortcuts
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'c') {
      event.preventDefault(); // Prevent Ctrl + C
      alert('You cannot copy or print the exam :D')
    }
    if (event.ctrlKey && event.key === 'v') {
      event.preventDefault(); // Prevent Ctrl + V
      alert('You cannot copy or print the exam :D')
    }
  }
}
