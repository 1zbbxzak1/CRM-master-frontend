import {catchError, map, NEVER, Observable} from "rxjs";
import {ErrorHandler, Injectable} from "@angular/core";
import {IRegistrationRequestModel} from "../../request-models/auth/IRegistration.request-model";
import {ILoginRequestModel} from "../../request-models/auth/ILogin.request-model";
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class IdentityService {

    constructor(
        private _authService: AuthService,
        private _errorHandler: ErrorHandler,
    ) {
    }

    public registerUser(user: IRegistrationRequestModel): Observable<boolean> {
        return this._authService.registerUser(user).pipe(
            map((): boolean => true),
            catchError(err => {
                this._errorHandler.handleError(err);
                return NEVER;
            })
        );
    }

    public loginUser(user: ILoginRequestModel): Observable<boolean> {
        return this._authService.loginUser(user).pipe(
            map((): boolean => true),
            catchError(err => {
                this._errorHandler.handleError(err);
                return NEVER;
            })
        );
    }
}
