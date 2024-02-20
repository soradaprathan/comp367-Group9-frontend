/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@toys-hub/users';

@Component({
    selector: 'admin-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
    constructor(private authService: AuthService) {}

    ngOnInit(): void {}

    logoutUser() {
        this.authService.logout();
    }
}
