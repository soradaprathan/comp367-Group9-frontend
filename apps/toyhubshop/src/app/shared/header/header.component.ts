import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService, UsersService } from '@toys-hub/users';
import { Subject } from 'rxjs';

@Component({
    selector: 'toyshop-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    constructor(private usersService: UsersService, private authService: AuthService) {}

    isAuthenticated = false;
    unsubscribe$: Subject<any> = new Subject();

    ngOnInit(): void {
        this._checkAuth();
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    logoutUser() {
        this.authService.logout();
        this.isAuthenticated = false;
    }

    private _checkAuth() {
        // Subcsrbe to the auth state from the users service
        this.usersService.isCurrentUserAuth().subscribe((isAuthenticated) => {
            this.isAuthenticated = isAuthenticated;
        });
    }
}
