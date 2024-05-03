import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChooseExamComponent } from './components/choose-exam/choose-exam.component';
import { ExamComponent } from './components/exam/exam.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaymentComponent } from './payment/payment.component';
import { ChooseExamTypeComponent } from './components/choose-exam-type/choose-exam-type.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { AboutComponent } from './components/about/about.component';
import { PaymentStatusComponent } from './components/payment-status/payment-status.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { YoutubePageComponent } from './components/youtube-page/youtube-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ChooseExamComponent,
    ExamComponent,
    HeaderComponent,
    PaymentComponent,
    ChooseExamTypeComponent,
    TermsAndConditionsComponent,
    AboutComponent,
    PaymentStatusComponent,
    SignupComponent,
    LoginComponent,
    YoutubePageComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
