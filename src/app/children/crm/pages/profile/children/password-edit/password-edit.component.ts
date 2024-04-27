import {ChangeDetectionStrategy, Component, DestroyRef, Inject, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidAuth} from "../../../../../../validators/auth.validator";
import {TuiDialogFormService} from "@taiga-ui/kit";
import {TuiDialogContext, TuiDialogService} from "@taiga-ui/core";
import {UserManagerService} from "../../../../../../data/services/user/user.manager.service";
import {Router} from "@angular/router";
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {IPasswordRequestModel} from "../../../../../../data/request-models/user/IPassword.request-model";
import {Observer} from "rxjs";

@Component({
    selector: 'app-password-edit',
    templateUrl: './password-edit.component.html',
    styleUrls: ['../../../../../styles/dialog-styles.css', './styles/password-edit.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordEditComponent {
    @Input() observer?: Observer<never>;

    protected formPassword: FormGroup = new FormGroup({
        oldPassword: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
        newPassword: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),

    });
    private readonly _controlValidator: ValidAuth = new ValidAuth(this.formPassword);

    constructor(
        @Inject(TuiDialogFormService)
        private readonly _dialogForm: TuiDialogFormService,
        @Inject(TuiDialogService)
        private readonly _dialogs: TuiDialogService,
        private _userManagerService: UserManagerService,
        private _destroyRef: DestroyRef,
        private _router: Router,
    ) {
    }

    public openDialogPassword(
        password: PolymorpheusContent<TuiDialogContext>,
    ): void {
        this._dialogs.open(
            password,
            {
                size: "s",
            })
            .pipe(
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe({
                complete: () => {
                    this.formPassword.reset();
                    this._dialogForm.markAsPristine();
                },
            });
    }

    protected onCancel(): void {
        if (this.observer) {
            this.observer.complete();
        }
    }

    protected isControlError(controlName: string): boolean {
        return this._controlValidator.isControlError(controlName);
    }

    protected isControlRequired(controlName: string): boolean {
        return this._controlValidator.isControlRequired(controlName);
    }

    protected isPasswordInvalid(controlName: string): boolean {
        return this._controlValidator.isPasswordInvalid(controlName);
    }

    protected updateUserPassword(): void {
        const oldPassword: string = this.formPassword.get('oldPassword')?.value;
        const newPassword: string = this.formPassword.get('newPassword')?.value;

        if (oldPassword && newPassword) {
            const password: IPasswordRequestModel = {oldPassword, newPassword};
            this._userManagerService.updateUserPassword(password)
                .pipe(
                    takeUntilDestroyed(this._destroyRef)
                )
                .subscribe(
                    (data: boolean): void => {
                        if (data) {
                            console.log('Update user password successfully');
                            this._dialogForm.markAsDirty();

                            this.onCancel();
                        }
                    }
                );
        } else {
            console.error('Not all fields are filled in correctly');
        }
    }
}
