import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, RegisterRequest } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  username = new FormControl<string>('', [Validators.required]);
  email = new FormControl<string>('', [Validators.required, Validators.email]);
  password = new FormControl<string>('', [Validators.required, Validators.minLength(5)]);
  role = new FormControl<string>('', [Validators.required]);
  registerForm: FormGroup;

  inlineNotification = {
    show: false,
    type: '',
    text: '',
  };

  constructor(private formBuilder: FormBuilder, private authService: AuthService, 
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: this.username,
      email: this.email,
      role: this.role,
      password: this.password
    });
  }

  register(): void {
    console.log(this.registerForm.value);
    const registerRequest: RegisterRequest = {
      userName: this.registerForm.get('username')?.value || '',
      email: this.registerForm.get('email')?.value || '',
      password: this.registerForm.get('password')?.value || '',
      role: this.registerForm.get('role')?.value || '',
    }
    this.authService.register(registerRequest).subscribe({
      next: (response: any) => {
        console.log(response);
        this.router.navigate(['login']);

       },
        error: (error: any) => {
          console.error(error);
       }
    });
  }

}
