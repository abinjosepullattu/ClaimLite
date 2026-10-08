import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClaimService {
  private apiUrl = `${environment.apiBaseUrl}/claims`;

  constructor(private http: HttpClient) {}

  getClaims() {
    return this.http.get(this.apiUrl);
  }

  createClaim(claimData: any) {
    return this.http.post(this.apiUrl, claimData);
  }
}