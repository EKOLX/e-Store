import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  constructor(private router: Router, public authService: AuthService) {}

  onLogout(event: MouseEvent) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
