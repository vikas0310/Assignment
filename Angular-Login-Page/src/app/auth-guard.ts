import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor() {}
    canActivate() {
        if (sessionStorage.getItem('userName') !== null && sessionStorage.getItem('userPassword') !== null) {
            return true;
        } else {
            alert('Provide UserName and Password before submit.');
            return false;
        }
    }
}
