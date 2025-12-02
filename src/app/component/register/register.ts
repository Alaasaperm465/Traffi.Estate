import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.html'
})
export class Register {
  error = signal('');

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    role: new FormControl('buyer', Validators.required)
  });

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
  if (this.registerForm.invalid) return;

  const name = this.registerForm.controls.name.value!;
  const email = this.registerForm.controls.email.value!;
  const password = this.registerForm.controls.password.value!;
  const role = this.registerForm.controls.role.value! as 'buyer' | 'seller';

  const success = this.auth.register({ name, email, password, role });

  if (success) {
    this.router.navigate(['/login']);
  } else {
    this.error.set('الإيميل مستخدم بالفعل');
  }
}
}
