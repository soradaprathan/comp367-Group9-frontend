import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegistrationComponent
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), InputTextModule, ButtonModule, FormsModule, ReactiveFormsModule],
    declarations: [LoginComponent, RegistrationComponent]
})
export class UsersModule {}
