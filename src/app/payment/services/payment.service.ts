import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = environment.backEndUrl;

  constructor(private http: HttpClient) { }

  initiatePayment(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/initiatePayment`, {}, { headers });
  }

  savePaymentData(data: any): Observable<any> {
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/savePaymentData`, data);
  }
}
