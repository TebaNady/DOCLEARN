import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseExamComponent } from './components/choose-exam/choose-exam.component';
import { ExamComponent } from './components/exam/exam.component';
import { PaymentComponent } from './payment/payment.component';
import { ChooseExamTypeComponent } from './components/choose-exam-type/choose-exam-type.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { AboutComponent } from './components/about/about.component';
// import { PaymentNewComponent } from '../../payment-new/payment-new.component';
import { PaymentStatusComponent } from './components/payment-status/payment-status.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component'
import { AuthGuard } from './auth.guard';
import { YoutubePageComponent } from './components/youtube-page/youtube-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'choose', component: ChooseExamComponent, canActivate: [AuthGuard] },
  { path: 'exam', component: ExamComponent, canActivate: [AuthGuard] },
  { path: 'payment-final', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'examType', component: ChooseExamTypeComponent, canActivate: [AuthGuard] },
  { path: 'termsAndConditions', component: TermsAndConditionsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'paymentStatus', component: PaymentStatusComponent, canActivate: [AuthGuard] },
  { path: 'videos', component: YoutubePageComponent },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
