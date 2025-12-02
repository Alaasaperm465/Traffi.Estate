import { Component } from '@angular/core';
import { Iproperty } from '../../models/Iproperty';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-properties',
  standalone: true, 
  imports: [CommonModule],
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
      sellerId: 101 
    },
    {
      id: 2,
      title: 'Modern Apartment',
      description: 'A stylish 2-bedroom apartment in the heart of the city.',
      price: 1200,
      location: 'Alexandria, Egypt',
      type: 'rent',
      image: 'assets/images/property2.jpg',
      sellerId: 102
    },
  ];
}
