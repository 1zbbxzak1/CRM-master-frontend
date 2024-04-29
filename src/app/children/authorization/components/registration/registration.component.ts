import {ChangeDetectionStrategy, Component, DestroyRef, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";
import {TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {TuiDialogFormService} from "@taiga-ui/kit";
import {fullNameValidator, phoneNumberValidator, ValidAuth} from "../../../../validators/auth.validator";
import {IRegistrationRequestModel} from "../../../../data/request-models/auth/IRegistration.request-model";
import {IdentityService} from "../../../../data/services/auth/identity.service";
import {Router} from "@angular/router";
import {UserManagerService} from "../../../../data/services/user/user.manager.service";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrl: '../../../styles/dialog-styles.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
    protected formRegistration: FormGroup = new FormGroup({
        fullName: new FormControl("", [Validators.required, fullNameValidator()]),
        email: new FormControl("", [Validators.required, Validators.email]),
        phoneNumber: new FormControl("", [Validators.required, phoneNumberValidator()]),
        password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
    });

    private readonly _controlValidator: ValidAuth = new ValidAuth(this.formRegistration);

    constructor(
        @Inject(TuiDialogFormService)
        private readonly _dialogForm: TuiDialogFormService,
        @Inject(TuiDialogService)
        private readonly _dialogs: TuiDialogService,
        private readonly _identityService: IdentityService,
        private readonly _userManagerService: UserManagerService,
        private readonly _destroyRef: DestroyRef,
        private readonly _router: Router,
    ) {
    }

    public openDialogRegistration(
        registration: PolymorpheusContent<TuiDialogContext>,
    ): void {
        this._dialogs.open(
            registration,
            {
                size: 's',
                data: {button: 'Зарегистрироваться'},
            })
            .pipe(
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe({
                complete: () => {
                    this.formRegistration.reset();
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

    protected isCorrectFullName(controlName: string): boolean {
        return this._controlValidator.isCorrectFullName(controlName);
    }

    protected isEmailInvalid(controlName: string): boolean {
        return this._controlValidator.isEmailInvalid(controlName);
    }

    protected isCorrectPhoneNumber(controlName: string): boolean {
        return this._controlValidator.isCorrectPhoneNumber(controlName);
    }

    protected isPasswordInvalid(controlName: string): boolean {
        return this._controlValidator.isPasswordInvalid(controlName);
    }

    protected registrationNewUser(): void {
        const fullName: string = this.formRegistration.get('fullName')?.value;
        const email: string = this.formRegistration.get('email')?.value;
        const phone: string = this.formRegistration.get('phoneNumber')?.value;
        const password: string = this.formRegistration.get('password')?.value;
        const vkLink: string = "";
        const telegramLink: string = "";

        if (email && password) {
            const user: IRegistrationRequestModel = {email, password, fullName, phone, vkLink, telegramLink};

            this._identityService.registerUser(user)
                .pipe(
                    takeUntilDestroyed(this._destroyRef)
                )
                .subscribe(
                    (data: boolean): void => {
                        if (data) {
                            console.log('Registered successfully');
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
