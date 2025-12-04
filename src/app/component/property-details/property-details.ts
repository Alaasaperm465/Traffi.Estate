import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Iproperty } from '../../models/Iproperty';
import { FavouriteService } from '../../services/favourite';
import { AuthService } from '../../services/auth';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './property-details.html',
  styleUrls: ['./property-details.css'],
})
export class PropertyDetails implements OnInit, OnDestroy {
  property!: Iproperty | undefined;
  error: string = '';
  isFav: boolean = false;
  private destroy$ = new Subject<void>();

  properties: Iproperty[] = [
    {
      id: 1,  
      title: 'Spacious Family Home',
      description: 'A beautiful 4-bedroom family home located in a quiet neighborhood.',
      price: 350000,
      location: 'Cairo, Egypt',
      type: 'sale',
      image: 'assets/images/property1.jpg',
      sellerId: 101 ,
      Area:90,
      pathRoomCount:1,
      RoomsCount:3,
      FinishLevel:"فاخر",
      purpos:"للبيع",
      status:"متاح",
    },
    {
      id: 2,
      title: 'Modern Apartment',
      description: 'A stylish 2-bedroom apartment in the heart of the city.',
      price: 1200,
      location: 'Alexandria, Egypt',
      type: 'rent',
      image: 'assets/images/property2.jpg',
      sellerId: 102,
      Area:100,
      pathRoomCount:1,
      RoomsCount:3,
      FinishLevel:"فاخر",
      purpos:"للبيع",
      status:"متاح",
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private favService: FavouriteService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.property = this.properties.find(p => p.id === id);

    if (!this.property) {
      this.error = '❌ العقار غير موجود';
      return;
    }

    // اشترك في تغييرات المفضلة
    this.favService.favourites$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(favs => {
      this.checkIfFavourite();
    });

    this.checkIfFavourite();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private checkIfFavourite(): void {
    if (!this.property) return;
    
    // تحقق من اللوجين أولاً
    if (!this.auth.isAuthenticated()) {
      this.isFav = false;
      return;
    }
    
    this.isFav = this.favService.isFavourite(this.property.id);
  }

  toggleFavourite(): void {
    // تحقق من اللوجين أولاً
    if (!this.auth.isAuthenticated()) {
      this.error = '⚠️ يجب تسجيل الدخول أولاً لإضافة العقار للمفضلة';
      return;
    }

    if (!this.property) return;

    if (this.isFav) {
      this.favService.removeFavourite(this.property.id);
      this.isFav = false;
    } else {
      this.favService.addFavourite(this.property);
      this.isFav = true;
    }
    
    this.error = '';
  }
}