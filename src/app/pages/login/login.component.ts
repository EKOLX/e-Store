import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  submitted = false;

  constructor(private router: Router, private authService: AuthService) {
    this.form = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  get formErrors() {
    return {
      username: this.form.controls['username'].errors,
      password: this.form.controls['password'].errors,
    };
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.submitted = true;

    const user = {
      username: this.form.value.username,
      password: this.form.value.password,
    };

    this.authService.login(user).subscribe(
      () => {
        this.form.reset();
        this.router.navigate(['/']);
        this.submitted = false;
      },
      (error: Error) => {
        this.submitted = false;
        alert(error.message);
      }
    );
  }
}
