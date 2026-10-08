import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from './services/user.service';
import { ClaimService } from './services/claim.service';

@Component({
  selector: 'app-claim-form',
  imports: [ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './claim-form.html',
  styleUrl: './claim-form.css',
})
export class ClaimForm implements OnInit {
  users: any[] = [];

  claimForm: any;

  isSubmitting = false;
  isLoadingUsers = true;

  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private claimService: ClaimService
  ) {
    this.claimForm = this.fb.group({
      userId: [
        '',
        Validators.required,
      ],

      claimType: [
        '',
        Validators.required,
      ],

      amount: [
        '',
        [
          Validators.required,
          Validators.min(0.01),
          Validators.max(1000000),
          Validators.pattern(/^\d+(\.\d{1,2})?$/),
        ],
      ],

      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
          Validators.pattern(/\S/),
        ],
      ],
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoadingUsers = true;

    this.userService.getUsers().subscribe({
      next: (response: any) => {
        this.users = response;
        this.isLoadingUsers = false;
      },

      error: (error: any) => {
        console.error('Error fetching users:', error);

        this.users = [];
        this.isLoadingUsers = false;

        this.errorMessage =
          'System Error: Unable to process request. Please try again.';
      },
    });
  }

  get policyholderOptions() {
    return this.users.map((user) => ({
      label: `${user.fullName} (${user.email})`,
      value: user._id,
    }));
  }

  onFieldInput(fieldName: string, event: Event) {
    const customEvent = event as CustomEvent<{ value?: string }>;
    const value = customEvent.detail?.value ?? '';

    this.claimForm.get(fieldName).setValue(value);
    this.claimForm.get(fieldName).markAsTouched();

    this.errorMessage = '';
    this.successMessage = '';
  }

  onSubmit() {
    console.log('Claim submit clicked');
    console.log('Claim form value:', this.claimForm.value);
    console.log('Claim form valid:', this.claimForm.valid);

    if (
      this.claimForm.invalid ||
      this.isSubmitting ||
      this.users.length === 0
    ) {
      this.claimForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const formValue = this.claimForm.value;

    const claimData = {
      userId: formValue.userId,
      claimType: formValue.claimType,
      amount: Number(formValue.amount),
      description: formValue.description.trim(),
    };

    console.log('Sending claim data:', claimData);

    this.claimService.createClaim(claimData).subscribe({
      next: (response: any) => {
        console.log('Claim created successfully:', response);

        this.isSubmitting = false;
        this.successMessage = 'Claim logged successfully.';

        this.claimForm.reset();
        this.claimForm.markAsPristine();
        this.claimForm.markAsUntouched();
      },

      error: (error: any) => {
        console.error('Error creating claim:', error);

        this.isSubmitting = false;

        if (error.status >= 500 || error.status === 0) {
          this.errorMessage =
            'System Error: Unable to process request. Please try again.';
        } else {
          this.errorMessage =
            error.error?.message ||
            'Unable to log claim. Please try again.';
        }
      },
    });
  }
}