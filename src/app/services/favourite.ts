import { Injectable, OnDestroy } from '@angular/core';
import { Iproperty } from '../models/Iproperty';
import { AuthService } from './auth';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService implements OnDestroy {
  private storageKey = 'aqarat_favourites_';
  private destroy$ = new Subject<void>();
  
  // Subject علشان الـ favourites
  private favouritesSubject = new BehaviorSubject<Iproperty[]>([]);
  favourites$ = this.favouritesSubject.asObservable();

  constructor(private auth: AuthService) {
    // اسمع لتغيرات اليوزر
    this.auth.currentUser$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(user => {
      if (user) {
        this.loadFavourites(user.id);
      } else {
        this.favouritesSubject.next([]);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadFavourites(userId: number): void {
    const key = `${this.storageKey}${userId}`;
    const raw = localStorage.getItem(key);
    const favourites = raw ? JSON.parse(raw) : [];
    this.favouritesSubject.next(favourites);
  }

  private getCurrentUserKey(): string | null {
    const user = this.auth.getCurrentUser();
    return user ? `${this.storageKey}${user.id}` : null;
  }

  getFavourites(): Iproperty[] {
    return this.favouritesSubject.getValue();
  }

  addFavourite(property: Iproperty): void {
    const userKey = this.getCurrentUserKey();
    if (!userKey) return;

    const currentFavs = this.getFavourites();
    
    // تحقق إذا العقار موجود
    if (!currentFavs.some(p => p.id === property.id)) {
      const updatedFavs = [...currentFavs, property];
      localStorage.setItem(userKey, JSON.stringify(updatedFavs));
      this.favouritesSubject.next(updatedFavs);
    }
  }

  removeFavourite(propertyId: number): void {
    const userKey = this.getCurrentUserKey();
    if (!userKey) return;

    const currentFavs = this.getFavourites();
    const updatedFavs = currentFavs.filter(p => p.id !== propertyId);
    
    localStorage.setItem(userKey, JSON.stringify(updatedFavs));
    this.favouritesSubject.next(updatedFavs);
  }

  isFavourite(propertyId: number): boolean {
    return this.getFavourites().some(p => p.id === propertyId);
  }
}