import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageUtils } from '../../utilities/local-storage.ultis';

@Injectable({
    providedIn: 'root'
})
export class UnauthGuard implements CanActivate {
    constructor(
        private router: Router
    ) { }

    canActivate(): boolean {
        const token = localStorage.getItem('accessToken');
        if (!!token) {
            this.router.navigate(['/']);
            return false;
        } else {
            return true;
        }
    }
}

export default UnauthGuard;
