import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClaimService } from './services/claim.service';

@Component({
  selector: 'app-claim-list',
  imports: [CurrencyPipe, DatePipe, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './claim-list.html',
  styleUrl: './claim-list.css',
})
export class ClaimList implements OnInit {
  claims: any[] = [];
  errorMessage = '';

  constructor(private claimService: ClaimService) {}

  ngOnInit() {
    this.claimService.getClaims().subscribe({
      next: (response: any) => {
        this.claims = response;
      },

      error: (error: any) => {
        console.error('Error fetching claims:', error);

        this.errorMessage =
          'System Error: Unable to process request. Please try again.';
      },
    });
  }
}