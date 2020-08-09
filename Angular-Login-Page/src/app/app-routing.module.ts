import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './auth-guard';


const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'welcome', component: WelcomeComponent,
    canActivate: [AuthGuard]
  },
   {
     path: '**', component: ErrorComponent
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
