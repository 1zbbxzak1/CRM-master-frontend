import {ChangeDetectionStrategy, Component, DestroyRef} from '@angular/core';
import {Observable} from "rxjs";
import {UserManagerService} from "../../../../../../data/services/user/user.manager.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {IUserRequestModel} from "../../../../../../data/request-models/user/IUser.request-model";
import {IUserResponseModel} from "../../../../../../data/response-models/user/IUser.response-model";

@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['../../../../styles/crm-styles.css', '../../styles/profile-styles.css', './styles/profile-edit.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileEditComponent {
    protected formUserInfo: FormGroup = new FormGroup({
        fullName: new FormControl(''),
        email: new FormControl(''),
        phone: new FormControl(''),
        vkLink: new FormControl(''),
        telegramLink: new FormControl(''),
    });

    protected user$: Observable<IUserResponseModel>;

    constructor(
        private readonly _userManagerService: UserManagerService,
        private readonly _destroyRef: DestroyRef,
        private readonly _router: Router,
    ) {
        this.user$ = this._userManagerService.getUserInfo();

        this.user$
            .pipe(
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe((user: IUserResponseModel): void => {
                if (user) {
                    this.formUserInfo.patchValue({
                        fullName: user.fullName,
                        email: user.email,
                        phone: user?.phone || 'Не назначено',
                        vkLink: user?.vkLink || 'Не привязано',
                        telegramLink: user?.telegramLink || 'Не привязано',
                    });
                }
            });
    }

    protected previousPageWithUserInfo(): void {
        this._router.navigate(['crm/profile']);
    }

    protected updateUserInfo(): void {
        const fullName: string = this.formUserInfo.get('fullName')?.value;
        const email: string = this.formUserInfo.get('email')?.value;
        const phone: string = this.formUserInfo.get('phone')?.value;
        const vkLink: string = this.formUserInfo.get('vkLink')?.value;
        const telegramLink: string = this.formUserInfo.get('telegramLink')?.value;

        if (fullName && email && phone && vkLink && telegramLink) {
            const user: IUserRequestModel = {fullName, email, phone, vkLink, telegramLink};
            this._userManagerService.updateUserInfo(user)
                .pipe(
                    takeUntilDestroyed(this._destroyRef)
                )
                .subscribe(
                    (data: boolean): void => {
                        if (data) {
                            console.log('Update user info successfully');

                            this._router.navigate(['crm/profile']);
                        }
                    }
                );
        } else {
            console.error('Not all fields are filled in correctly');
        }
    }
}
