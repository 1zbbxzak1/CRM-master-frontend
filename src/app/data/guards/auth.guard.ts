import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
    ) {
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const isAuthorized: string | null = localStorage.getItem("id");

        if (state.url === '/welcome') {
            if (isAuthorized !== null) {
                this.router.navigate(["profile"]);
                return false;
            }
            return true;
        } else {
            if (isAuthorized === null) {
                this.router.navigate(["welcome"]);
                return false;
            }
            return true;
        }
    }
}
