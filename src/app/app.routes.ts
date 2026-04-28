import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    {path: '', title: 'MovieApp - Home', component: HomeComponent},
    {path: 'login', title: 'MovieApp - Login', component: LoginComponent},
    {path: 'register', title: 'MovieApp - Register', component: RegisterComponent},
];
