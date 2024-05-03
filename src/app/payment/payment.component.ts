import { Component, OnInit } from '@angular/core';
import { PaymentService } from './services/payment.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  iframeURL: string = '';

  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
  }

  initiatePayment() {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    console.log(token)

    if (!token) {
      console.error('Token not found in localStorage');
      // Handle the case where token is not found
      // For example, you can redirect the user to the login page
      // or display an error message to inform the user
      return;
    }

    this.paymentService.initiatePayment(token).subscribe(
      (response) => {
        console.log('Initiate payment response:', response);
        this.iframeURL = response.iframeURL;
        window.location.href = this.iframeURL;
      },
      (error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          // Client-side error occurred
          console.error('An error occurred:', error.error.message);
          // Handle client-side error
        } else {
          // Backend returned an unsuccessful response code
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${JSON.stringify(error.error)}`
          );
          // Handle backend error
          // For example, display an error message to the user
        }
      }
    );
  }
}
