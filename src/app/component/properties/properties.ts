import { Component } from '@angular/core';
import { Iproperty } from '../../models/Iproperty';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-properties',
  standalone: true, 
  imports: [CommonModule,RouterLink, RouterLinkActive],
  templateUrl: './properties.html',
  styleUrl: './properties.css',
})
export default class Properties {
  properties:Iproperty[] = [
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
      status :"متاح",
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
      status :"متاح",
    },
  ];
}
