import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth/auth.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
    { path: '', component: AuthComponent, data: { animation: 'dash' }, children: [
        { path: 'private_login', component: LoginComponent, data: { animation: 'private_login' } },
        { path: 'legal_login', component: LoginComponent, data: { animation: 'legal_login' } },
        { path: 'private_register', component: RegisterComponent, data: { animation: 'private_register' } },
        { path: 'legal_register', component: RegisterComponent, data: { animation: 'legal_register' } },
        { path: 'forgot_password', component: ForgotPasswordComponent, data: { animation: 'forgot_password' } },
        { path: 'verify_email', component: VerifyEmailComponent, data: { animation: 'verify_email' } }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }