import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  apiURL = "https://doclearn-backend.onrender.com";

  constructor(private http: HttpClient) { }

  getAllQuestions(token: any): Observable<any> {
    // Creating HttpHeaders object with Authorization header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    // Making GET request with options including headers
    return this.http.get<any>(`${this.apiURL}/questions`, { headers });
  }
  editPay(token: string): Observable<any> {
    const url = `${this.apiURL}/editPay`;

    // Creating HttpHeaders object with Authorization header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Passing headers in the request options
    return this.http.put<any>(url, {}, { headers });
  }

}
