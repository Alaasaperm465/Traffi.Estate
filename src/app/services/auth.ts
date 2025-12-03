import { Injectable } from '@angular/core';
import { IUser } from '../models/Iuser';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users: IUser[] = [
    { id: 1, name: 'ali', email: 'ali@gmail.com', password: 'ali123', role: 'seller' },
    { id: 2, name: 'alaa', email: 'alaa@gmail.com', password: 'alaa123', role: 'buyer' }
  ];

  private currentKey = 'aqarat_current_user';
  
  // هنا دي أهم حاجة: BehaviorSubject علشان يسمع أي تغيير في اليوزر
  private currentUserSubject = new BehaviorSubject<IUser | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    // جيب اليوزر من localStorage أول ما السيرفيس يبدأ
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const raw = localStorage.getItem(this.currentKey);
    if (raw) {
      const user: IUser = JSON.parse(raw);
      this.currentUserSubject.next(user);
    }
  }

  // Register
  register(newUser: Omit<IUser, 'id'>): boolean {
    const exists = this.users.some(u => u.email === newUser.email.toLowerCase());
    if (exists) return false;

    const id = this.users.length ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
    const user: IUser = { id, ...newUser, email: newUser.email.toLowerCase() };
    
    this.users.push(user);

    // خزن في localStorage وأبلغ الـ Subject
    localStorage.setItem(this.currentKey, JSON.stringify(user));
    this.currentUserSubject.next(user);
    
    return true;
  }

  // login
  login(email: string, password: string): boolean {
    const user = this.users.find(u => 
      u.email === email.toLowerCase() && u.password === password
    );
    
    if (!user) return false;
    
    localStorage.setItem(this.currentKey, JSON.stringify(user));
    this.currentUserSubject.next(user); // هنا أهم حاجة: بلغ الجميع بتغيير اليوزر
    
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.currentKey);
    this.currentUserSubject.next(null); // بلغ الجميع أن اليوزر خرج
    this.router.navigate(['/login']);
  }

  getCurrentUser(): IUser | null {
    return this.currentUserSubject.getValue();
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  getUserRole(): 'seller' | 'buyer' | null {
    const u = this.getCurrentUser();
    return u ? u.role : null;
  }
}