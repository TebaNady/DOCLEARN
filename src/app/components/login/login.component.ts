import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from "../../../environments/environment"


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: string = '';
  isLoading: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.http.post<any>(`${environment.backEndUrl}/login`, this.loginForm.value)
        .subscribe(
          (response) => {
            console.log('Login successful:', response);
            localStorage.setItem('token', response.token);
            localStorage.setItem('role', response.role);
            // You can navigate to another page or handle the login success here
            if (response.role === 'admin') {
              // Redirect admin to admin page
              this.router.navigateByUrl('/exam');
            } else {
              // Redirect regular user to user page
              this.router.navigateByUrl('/choose');
            }
          },
          (error) => {
            this.isLoading = false;
            if (error.status === 401) {
              this.loginError = 'Invalid ID or password. Please try again.';
            } else {
              this.loginError = 'An error occurred while logging in. Please try again later.';
            }
          }
        );
    } else {
      this.loginError = ('Form is invalid. Please fill in all required fields correctly.');
    }
  }
}
