import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {MessageService} from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, public messageService: MessageService) {
    }

    // @ts-ignore
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const user = localStorage.getItem('USER');
        if (user == null) {
            return new Promise(res => {
                this.router.navigate(['/Login']);
            });
        } else {
            return true;
        }
    }
}
