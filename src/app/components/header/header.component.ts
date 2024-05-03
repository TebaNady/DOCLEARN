import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { environment } from "../../../environments/environment"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }
  isLoggedIn(): boolean {
    // Here you can check if the user is authenticated
    // For example, you can check if a token exists in localStorage
    return !!localStorage.getItem('token');
  }

  logout(): void {
    // Send a request to your backend to log the user out
    this.http.post<any>(`${environment.backEndUrl}/logout`, {}).subscribe(
      (response) => {
        console.log('Logout successful:', response);
        // Clear any local storage or session storage if needed
        localStorage.clear();

        // Clear session storage
        sessionStorage.clear();
        // Redirect the user to the login page or homepage
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Logout error:', error);
        // Handle logout error if needed
      }
    );
  }

}
