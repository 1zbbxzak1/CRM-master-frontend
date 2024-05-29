import {TuiDialogFormService} from "@taiga-ui/kit";
import {AfterViewInit, Component, DestroyRef, ElementRef, inject, ViewChild} from "@angular/core";
import {TuiDialogContext, TuiDialogService, TuiDialogSize} from "@taiga-ui/core";
import {Router} from "@angular/router";
import {ValidAuth} from "../../../validators/auth.validator";
import {FormGroup} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";
import {UserManagerService} from "../../../data/services/user/user.manager.service";
import {ILoginRequestModel} from "../../../data/request-models/auth/ILogin.request-model";
import {IRegistrationRequestModel} from "../../../data/request-models/auth/IRegistration.request-model";
import {Observable} from "rxjs";
import * as VKID from "@vkid/sdk";
import {IdentityService} from "../../../data/services/auth/identity.service";

@Component({
    template: ''
})
export class AuthBaseComponent implements AfterViewInit {
    protected readonly _identityService: IdentityService = inject(IdentityService);
    @ViewChild('vkIdButton')
    private readonly vkIdButton!: ElementRef;
    private readonly _dialogForm: TuiDialogFormService = inject(TuiDialogFormService);
    private readonly _dialogs: TuiDialogService = inject(TuiDialogService);
    private readonly _destroyRef: DestroyRef = inject(DestroyRef);
    private readonly _router: Router = inject(Router);
    private readonly _userManagerService: UserManagerService = inject(UserManagerService);

    private readonly _controlValidator: ValidAuth = new ValidAuth(this.formAuth);

    constructor(protected formAuth: FormGroup) {
    }

    ngAfterViewInit(): void {
        VKID.Config.set({
            app: 51908355,
            redirectUrl: 'http://2984145-zs33262.twc1.net',
        });

        const oneTap: VKID.OneTap = new VKID.OneTap();

        const container = this.vkIdButton.nativeElement;

        if (container) {
            oneTap.render({
                container,
                lang: 0,
                styles: {
                    width: 160,
                    borderRadius: 40,
                },
            });
            this._identityService.externalAuthVk();
        }
    }

    public openDialogAuth(
        auth: PolymorpheusContent<TuiDialogContext>,
        size: TuiDialogSize,
    ): void {
        this._dialogs.open(
            auth,
            {
                size,
            })
            .pipe(
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe({
                complete: (): void => {
                    this.formAuth.reset();
                    this._dialogForm.markAsPristine();
                },
            });
    }

    protected authUser(
        actionFunction: OmitThisParameter<(user: any) => Observable<boolean>>,
        user: ILoginRequestModel | IRegistrationRequestModel
    ): void {
        actionFunction(user)
            .pipe(
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe(
                (): void => {
                    console.log('Auth successfully');
                    this._dialogForm.markAsDirty();

                    this._userManagerService.getUserInfo()
                        .pipe(
                            takeUntilDestroyed(this._destroyRef)
                        )
                        .subscribe((): void => {
                            this._router.navigate(["crm/orders"]);
                        });
                }
            );
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
