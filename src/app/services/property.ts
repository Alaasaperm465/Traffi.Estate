import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Iproperty } from '../models/Iproperty';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {

  // المصدر الأساسي للداتا
  private propertiesSubject = new BehaviorSubject<Iproperty[]>([]);

  // Observable مشترك
  properties$ = this.propertiesSubject.asObservable();

  constructor(private _userAuth:AuthService,private http: HttpClient) {}

  // ✅ إضافة عقار
  addProperty(property: Iproperty): void {
    const current = this.propertiesSubject.getValue();
    const updated = [...current, property];
    this.propertiesSubject.next(updated);

    console.log('تمت الإضافة:', updated);
  }

  // ✅ جلب كل العقارات
  getAllProperties(): Observable<Iproperty[]> {
  const headers = new HttpHeaders({
    authorization: this._userAuth.getToken()
  });

  return this.http.get<Iproperty[]>(
    'https://api.example.com/properties',
    { headers : new HttpHeaders({
      "authirized" : this._userAuth.getToken(),
    })}
  );
}

  // ✅ جلب عقار بالـ ID (Observable)
  getPropertyById(id: number): Observable<Iproperty | undefined> {
    return this.properties$.pipe(
      map(properties => properties.find(p => p.id === id))
    );
  }

  // ✅ حذف عقار بالـ ID
  deleteProperty(id: number): void {
    const current = this.propertiesSubject.getValue();
    const updated = current.filter(p => p.id !== id);
    this.propertiesSubject.next(updated);
  }

  // ✅ تعديل عقار
  updateProperty(updatedProperty: Iproperty): void {
    const current = this.propertiesSubject.getValue();

    const updated = current.map(p =>
      p.id === updatedProperty.id ? updatedProperty : p
    );

    this.propertiesSubject.next(updated);
  }

  // ✅ تفريغ كل العقارات (اختياري)
  clearAll(): void {
    this.propertiesSubject.next([]);
  }
}
