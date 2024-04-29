import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {from, map, Observable, of} from "rxjs";
import {inject} from "@angular/core";

export class AuthGuard {

    private readonly _router: Router = inject(Router);

    public canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const isAuthorized: string | null = localStorage.getItem("id");

        if (state.url === '/welcome') {
            if (isAuthorized !== null) {
                from(this._router.navigate(["profile"])).pipe(
                    map((): boolean => false)
                );
            }
            return of(true);
        } else {
            if (isAuthorized === null) {
                from(this._router.navigate(["welcome"])).pipe(
                    map((): boolean => false)
                );
            }
            return of(true);
        }
    }
}
