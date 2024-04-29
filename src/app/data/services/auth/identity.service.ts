import {catchError, map, NEVER, Observable} from "rxjs";
import {ErrorHandler, inject} from "@angular/core";
import {IRegistrationRequestModel} from "../../request-models/auth/IRegistration.request-model";
import {ILoginRequestModel} from "../../request-models/auth/ILogin.request-model";
import {AuthService} from "./auth.service";

export class IdentityService {

    private readonly _authService: AuthService = inject(AuthService);
    private readonly _errorHandler: ErrorHandler = inject(ErrorHandler);


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

    public logoutUser(): Observable<void> {
        localStorage.clear();
        
        return this._authService.logoutUser();
    }
}
