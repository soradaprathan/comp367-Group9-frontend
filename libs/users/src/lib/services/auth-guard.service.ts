import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private localStorageToken: LocalstorageService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.localStorageToken.isValidToken()) return true;

        this.router.navigate(['/login']);
        return false;
    }

    private _tokenExpired(expiration): boolean {
        return Math.floor(new Date().getTime() / 1000) >= expiration;
    }
}
