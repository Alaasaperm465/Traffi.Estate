import { Component, OnInit, OnDestroy } from '@angular/core';
import { FavouriteService } from '../../services/favourite';
import { Iproperty } from '../../models/Iproperty';
import { AuthService } from '../../services/auth';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-favourit',
  templateUrl: './favourit.html',
  styleUrls: ['./favourit.css'],
})
export class Favourit implements OnInit, OnDestroy {
  favourites: Iproperty[] = [];
  error: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private favService: FavouriteService, 
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    // اشترك في الـ observable تاع المفضلة
    this.favService.favourites$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(favs => {
      this.favourites = favs;
      
      // لو مفيش بيانات ومفيش يوزر عامل لوجين
      if (favs.length === 0 && !this.auth.isAuthenticated()) {
        this.error = '⚠️ يجب تسجيل الدخول لعرض العقارات المفضلة';
      } else {
        this.error = '';
      }
    });

    // تحقق من اليوزر
    if (!this.auth.isAuthenticated()) {
      this.error = '⚠️ يجب تسجيل الدخول لعرض العقارات المفضلة';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  removeFromFavourites(propertyId: number): void {
    if (confirm('هل تريد إزالة هذا العقار من المفضلة؟')) {
      this.favService.removeFavourite(propertyId);
    }
  }
}