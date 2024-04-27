import {ChangeDetectionStrategy, Component, DestroyRef, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TuiDialogFormService} from "@taiga-ui/kit";
import {TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {Router} from "@angular/router";
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ValidAuth} from "../../../../validators/auth.validator";
import {ILoginRequestModel} from "../../../../data/request-models/auth/ILogin.request-model";
import {IdentityService} from "../../../../data/services/auth/identity.service";
import {UserManagerService} from "../../../../data/services/user/user.manager.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: '../../../styles/dialog-styles.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
    protected formLogin: FormGroup = new FormGroup({
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
    });

    private readonly _controlValidator: ValidAuth = new ValidAuth(this.formLogin);

    constructor(
        @Inject(TuiDialogFormService)
        private readonly _dialogForm: TuiDialogFormService,
        @Inject(TuiDialogService)
        private readonly _dialogs: TuiDialogService,
        private _identityService: IdentityService,
        private _userManagerService: UserManagerService,
        private _destroyRef: DestroyRef,
        private _router: Router,
    ) {
    }

    public openDialogLogIn(
        login: PolymorpheusContent<TuiDialogContext>,
    ): void {
        this._dialogs.open(
            login,
            {
                size: "s",
                data: {button: 'Войти'},
            })
            .pipe(
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe({
                complete: () => {
                    this.formLogin.reset();
                    this._dialogForm.markAsPristine();
                },
            });
    }

    protected isControlError(controlName: string): boolean {
        return this._controlValidator.isControlError(controlName);
    }

    protected isControlRequired(controlName: string): boolean {
        return this._controlValidator.isControlRequired(controlName);
    }

    protected isEmailInvalid(controlName: string): boolean {
        return this._controlValidator.isEmailInvalid(controlName);
    }

    protected isPasswordInvalid(controlName: string): boolean {
        return this._controlValidator.isPasswordInvalid(controlName);
    }

    protected logInUser(): void {
        const email: string = this.formLogin.get('email')?.value;
        const password: string = this.formLogin.get('password')?.value;

        if (email && password) {
            const user: ILoginRequestModel = {email, password};
            this._identityService.loginUser(user)
                .pipe(
                    takeUntilDestroyed(this._destroyRef)
                )
                .subscribe(
                    (data: boolean): void => {
                        if (data) {
                            console.log('Login successfully');
                            this._dialogForm.markAsDirty();

                            this._userManagerService.getUserInfo()
                                .pipe(
                                    takeUntilDestroyed(this._destroyRef)
                                )
                                .subscribe((): void => {
                                    this._router.navigate(["profile"]);
                                });
                        }
                    }
                );
        } else {
            console.error('Not all fields are filled in correctly');
        }
    }
}
