import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html'
})
export class Login {
  error = '';

  constructor(private _authServe: AuthService, private router: Router) {}

  onSubmit(username: string, password: string) {
    const success = this._authServe.login(username, password);

    if (success) {
      this.router.navigate(['/profile']); 
    } else {
      this.error = 'الإيميل أو كلمة المرور غير صحيحة'; 
    }
  }
}
