import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public readonly BASE_URL = 'http://localhost:9090';
  private loggedIn = signal<boolean>(this.isAuthenticated());
  
  constructor(private http: HttpClient) {}

   register(registerRequest: RegisterRequest) : Observable<AuthResponse> {
      return this.http.post<AuthResponse>(`${this.BASE_URL}/api/v1/auth/register`, registerRequest);
   }

   login(loginRequest: LoginRequest) : Observable<AuthResponse> {
      return this.http.post<AuthResponse>(`${this.BASE_URL}/api/v1/auth/login`, loginRequest)
      .pipe(tap((response: AuthResponse) => {
         sessionStorage.setItem('accessToken', response.accessToken);
         sessionStorage.setItem('refreshToken', response.refreshToken);
         sessionStorage.setItem('userName', response.userName);
         sessionStorage.setItem('email', response.email);
      }))
   }

   logout(): void {
      // sessionStorage.removeItem('accessToken');
      sessionStorage.clear();
   }

   isAuthenticated(): boolean {
      return  !!sessionStorage.getItem('accessToken');
   }

   setLoggedIn(value: boolean): void {
      this.loggedIn.set(value);
   }

   isLoggedIn(): WritableSignal<boolean> {
      return this.loggedIn;
   }

}

export type RegisterRequest = {
   userName : string,
   email : string,
   password : string,
   role : string,
}

export type LoginRequest = {
   email : string,
   password : string,
}

export type AuthResponse  = {
   accessToken : string,
   refreshToken : string,
   userName : string,
   email : string,
}
