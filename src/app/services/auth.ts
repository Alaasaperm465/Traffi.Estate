import { Injectable } from '@angular/core';
import { IUser } from '../models/Iuser';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users: IUser[] = [
    { id: 1, name: ' ali', email: 'ali@gmail.com', password: 'ali123', role: 'seller' },
    { id: 2, name: ' alaa', email: 'alaa@gmail.com', password: 'alaa123', role: 'buyer' }
  ];

  private currentKey = 'aqarat_current_user';

  constructor(private router: Router) {}
//Register
  register(newUser: Omit<IUser, 'id'>): boolean {
  const exists = this.users.some(u => u.email === newUser.email.toLowerCase());
  if (exists) return false;

  const id = this.users.length ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
  const user: IUser = { id, ...newUser, email: newUser.email.toLowerCase() };
  
  this.users.push(user);

  // خزن مباشر في LocalStorage
  localStorage.setItem(this.currentKey, JSON.stringify(user));

  return true;
}


  // login
  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email.toLowerCase() && u.password === password);
    if (!user) return false;
    localStorage.setItem(this.currentKey, JSON.stringify(user));
    return true;
  }

  logout() {
    localStorage.removeItem(this.currentKey);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): IUser | null {
    const raw = localStorage.getItem(this.currentKey);
    return raw ? JSON.parse(raw) as IUser : null;
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  getUserRole(): 'seller' | 'buyer' | null {
    const u = this.getCurrentUser();
    return u ? u.role : null;
  }
}
