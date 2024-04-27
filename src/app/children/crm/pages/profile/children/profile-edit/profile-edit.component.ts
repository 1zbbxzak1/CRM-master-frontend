import {Component, DestroyRef} from '@angular/core';
import {Observable} from "rxjs";
import {IUserResponseModel} from "../../../../../../data/response-models/user/IUser.response-model";
import {UserManagerService} from "../../../../../../data/services/user/user.manager.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {IUserRequestModel} from "../../../../../../data/request-models/user/IUser.request-model";

@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html',
    styleUrls: ['../../../../styles/crm-styles.css', '../../styles/profile-styles.css', './styles/profile-edit.component.css']
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
        private _userManagerService: UserManagerService,
        private _destroyRef: DestroyRef,
        private _router: Router,
    ) {
        this.user$ = this._userManagerService.getUserInfo();

        this.user$.subscribe(user => {
            if (user) {
                this.formUserInfo.patchValue({
                    fullName: user.fullName,
                    email: user.email,
                    phone: user?.phone || 'Не назначен',
                    vkLink: user?.vkLink || 'Не привязан',
                    telegramLink: user?.telegramLink || 'Не привязан',
                });
            }
        });
    }

    protected previousPageWithUserInfo(): void {
        this._router.navigate(['profile']);
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

                            this._router.navigate(['profile']);
                        }
                    }
                );
        } else {
            console.error('Not all fields are filled in correctly');
        }
    }
}
