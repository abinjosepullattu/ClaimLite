import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {
  userForm: any;

  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern(/\S/),
        ],
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email,
        ],
      ],

      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{10}$/),
        ],
      ],
    });
  }

  onFieldInput(fieldName: string, event: Event) {
    const customEvent = event as CustomEvent<{ value?: string }>;
    let value = customEvent.detail?.value ?? '';

    if (fieldName === 'phone') {
      value = value.replace(/\D/g, '').slice(0, 10);
    }

    this.userForm.get(fieldName).setValue(value);
    this.userForm.get(fieldName).markAsTouched();

    this.errorMessage = '';
    this.successMessage = '';
  }

  onSubmit() {
    console.log('User submit clicked');
    console.log('Form value:', this.userForm.value);
    console.log('Form valid:', this.userForm.valid);

    if (this.userForm.invalid || this.isSubmitting) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const formValue = this.userForm.value;

    const userData = {
      fullName: formValue.fullName.trim(),
      email: formValue.email.trim().toLowerCase(),
      phone: formValue.phone.replace(/\D/g, ''),
    };

    this.userService.createUser(userData).subscribe({
      next: (response: any) => {
        console.log('User created successfully:', response);

        this.isSubmitting = false;
        this.successMessage =
          'Policyholder registered successfully.';

        this.userForm.reset();
        this.userForm.markAsPristine();
        this.userForm.markAsUntouched();
      },

      error: (error: any) => {
        console.error('Error creating user:', error);

        this.isSubmitting = false;

        if (error.status === 409) {
          this.errorMessage = 'Email already exists.';
        } else if (error.status >= 500 || error.status === 0) {
          this.errorMessage =
            'System Error: Unable to process request. Please try again.';
        } else {
          this.errorMessage =
            error.error?.message ||
            'Unable to register policyholder. Please try again.';
        }
      },
    });
  }
}