import {catchError, map, NEVER, Observable, Subscription} from "rxjs";
import {DestroyRef, ErrorHandler, inject} from "@angular/core";
import {IRegistrationRequestModel} from "../../request-models/auth/IRegistration.request-model";
import {ILoginRequestModel} from "../../request-models/auth/ILogin.request-model";
import {AuthService} from "./auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IAuthVkResponseModel} from "../../response-models/external-auth/IAuthVk.response-model";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {UserManagerService} from "../user/user.manager.service";

export class IdentityService {

    private readonly _router: ActivatedRoute = inject(ActivatedRoute);
    private readonly _route: Router = inject(Router);
    private readonly _destroyRef: DestroyRef = inject(DestroyRef);
    private readonly _authService: AuthService = inject(AuthService);
    private readonly _userManagerService: UserManagerService = inject(UserManagerService);
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

    externalAuthVk(): Subscription {
        return this._router.queryParams.subscribe(params => {
            const payload = params['payload'];
            if (payload) {
                this._authService.externalGet(payload).subscribe((userCredential: IAuthVkResponseModel): void => {
                    const userModel: IAuthVkResponseModel = {
                        haveAccount: userCredential.haveAccount,
                        fullName: userCredential.fullName,
                        email: userCredential.email,
                        phone: userCredential.phone,
                        vkId: userCredential.vkId,
                    }
                    this._userManagerService.getUserInfo()
                        .pipe(
                            takeUntilDestroyed(this._destroyRef)
                        )
                        .subscribe((): void => {
                            this._route.navigate(["crm/orders"]);
                        });
                    console.log(userModel);
                });

                this._route.navigate(['crm/orders']);
            } else {
                console.log('VK token exchange failed');
            }
        });
    }

    public logoutUser(): Observable<void> {
        localStorage.clear();

        return this._authService.logoutUser();
    }
}
