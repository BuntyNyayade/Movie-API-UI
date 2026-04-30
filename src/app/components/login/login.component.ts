import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginRequest } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = new FormControl<string>('', [Validators.required, Validators.email]);
  password = new FormControl<string>('', [Validators.required, Validators.minLength(5)]);
 
  loginForm: FormGroup;

  inlineNotification = {
    show: false,
    type: '',
    text: '',
  };

  constructor(private formBuilder: FormBuilder, private authService: AuthService, 
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

   login(): void {
      console.log(this.loginForm.value);
      if (this.loginForm.valid) {
        const loginRequest: LoginRequest = {
        email: this.loginForm.get('email')?.value || '',
        password: this.loginForm.get('password')?.value || '',
      }
      this.authService.login(loginRequest).subscribe({
        next: (response: any) => {
          console.log(response);
          this.authService.setLoggedIn(true);
          this.router.navigate(['add-movie']);
  
         },
          error: (error: any) => {
            console.error(error);
            this.loginForm.reset();
            this.inlineNotification = {
              show: true,
              type: 'error',
              text: 'Login failed. Please check your credentials and try again.',
            };
         }
      });
    }
    else {
      this.inlineNotification = {
        show: true,
        type: 'error',
        text: 'Please fill in all required fields with valid information.',
      };
   }
  }
}
