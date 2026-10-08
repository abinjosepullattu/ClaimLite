import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { DatePipe, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-user-list',
  imports: [DatePipe, SlicePipe, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {
  users: any[] = [];
  errorMessage = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (response: any) => {
        this.users = response;
      },

      error: (error: any) => {
        console.error('Error fetching users:', error);

        this.errorMessage =
          'System Error: Unable to process request. Please try again.';
      },
    });
  }
}