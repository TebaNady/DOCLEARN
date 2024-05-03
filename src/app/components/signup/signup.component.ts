import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from "../../../environments/environment"

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm!: FormGroup;
  isLoading: boolean = false;
  submitError: string = '';
  agreeToTerms: boolean = false;
  

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      year: ['', Validators.required],
      university: ['', Validators.required],
      faculty: ['', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.http.post<any>(`${environment.backEndUrl}/signup`, this.registerForm.value)
        .subscribe(
          (response) => {
            console.log('Signup successful:', response);
            this.router.navigateByUrl('/login');
          },
          (error) => {
            console.error('Signup error:', error);
            this.isLoading = false;
            if (error.status === 409) {
              this.submitError = 'ID is already in use. Please choose a different one.';
            } else if (error.status === 400) {
              if (error.error && error.error.message === 'InvalidEmail') {
                this.submitError = 'Invalid email format.';
              } else {
                this.submitError = 'Invalid request. Please check your input.';
              }
            } else if (error.status === 500) {
              this.submitError = 'Server error occurred. Please try again later.';
            } else {
              this.submitError = 'Error occurred while signing up. Please try again later.';
            }
          }
        );
    } else {
      this.submitError = 'Form is invalid. Please fill in all required fields correctly.';
    }
  }
}
