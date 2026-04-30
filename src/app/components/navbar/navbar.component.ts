import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isLoggedIn = signal<boolean>(false);
  name = sessionStorage.getItem('userName') || '';
  isMenuOpen = false;
  isMoviesOpen = false;

  constructor(private authService: AuthService,
      private router: Router
  ) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;

    if (!this.isMenuOpen) {
      this.isMoviesOpen = false;
    }
  }

  toggleMovies(): void {
    this.isMoviesOpen = !this.isMoviesOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    this.isMoviesOpen = false;
  }

  logout() {
    this.closeMenu();
    this.authService.logout();
    this.authService.setLoggedIn(false);
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}
