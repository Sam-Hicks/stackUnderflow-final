import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../../components/login/login.component';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import { HomePageComponent } from '../../components/home-page/home-page.component';
import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '../../components/verify-email/verify-email.component';
import { SurveyComponent } from '../../components/survey/survey.component';
import { SettingsComponent } from '../../components/settings/settings.component';


import { AuthGuard } from "../../shared/guard/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/settings', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'register-user', component: SignUpComponent},
  { path: 'home-page', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'survey', component: SurveyComponent},
  { path: 'settings', component: SettingsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
