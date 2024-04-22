import {ChangeDetectionStrategy, Component, DestroyRef, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";
import {TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {TuiDialogFormService} from "@taiga-ui/kit";
import {fullNameValidator, phoneNumberValidator, ValidAuth} from "../../../../validators/auth.validator";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrl: '../../styles/authorization-styles.scss',
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
        @Inject(TuiDialogFormService) private readonly _dialogForm: TuiDialogFormService,
        @Inject(TuiDialogService) private readonly _dialogs: TuiDialogService,
        private _destroyRef: DestroyRef,
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
}
