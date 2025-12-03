import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Property } from '../../services/property'
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-property.html',
  styleUrls: ['./add-property.css']
})
export class AddProperty implements OnInit {
  propertyForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private propertyService: Property,
    private authService: AuthService,
    private router: Router
  ) {
    this.propertyForm = this.createForm();
  }

  ngOnInit(): void {
    // تحقق إذا اليوزر عامل لوجين و seller
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    
    if (this.authService.getUserRole() !== 'seller') {
      this.errorMessage = '⚠️ فقط البائعون يمكنهم إضافة عقارات';
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(1)]],
      areaSpace: ['', [Validators.required, Validators.min(1)]],
      rooms: ['', [Validators.required, Validators.min(0)]],
      bathrooms: ['', [Validators.required, Validators.min(0)]],
      location: ['', [Validators.required]],
      propertyType: ['', [Validators.required]],
      finishingLevel: ['Standard'],
      purpose: ['', [Validators.required]],
      status: ['Available']
    });
  }

  onSubmit(): void {
    if (this.propertyForm.invalid) {
      // علام على كل الحقول اللي فيها أخطاء
      Object.keys(this.propertyForm.controls).forEach(key => {
        const control = this.propertyForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    if (this.authService.getUserRole() !== 'seller') {
      this.errorMessage = '⚠️ فقط البائعون يمكنهم إضافة عقارات';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const currentUser = this.authService.getCurrentUser();
    const propertyData = {
      ...this.propertyForm.value,
      sellerId: currentUser?.id,
      createdAt: new Date().toISOString(),
      image: 'assets/images/default-property.jpg' // صورة افتراضية
    };

    
  }

  // Helper methods للـ template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.propertyForm.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  getFieldError(fieldName: string): string {
    const field = this.propertyForm.get(fieldName);
    if (!field || !field.errors) return '';
    
    if (field.errors['required']) return 'هذا الحقل مطلوب';
    if (field.errors['minlength']) return `الحد الأدنى ${field.errors['minlength'].requiredLength} أحرف`;
    if (field.errors['min']) return `القيمة يجب أن تكون ${field.errors['min'].min} أو أكثر`;
    
    return 'قيمة غير صحيحة';
  }
}