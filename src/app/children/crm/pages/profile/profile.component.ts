import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {UserManagerService} from "../../../../data/services/user/user.manager.service";
import {IUserResponseModel} from '../../../../data/response-models/user/IUser.response-model';
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {IdentityService} from "../../../../data/services/auth/identity.service";
import {PasswordEditComponent} from "./children/password-edit/password-edit.component";
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";
import {TuiDialogContext} from "@taiga-ui/core";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['../../styles/crm-styles.css', './styles/profile-styles.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
    protected user$: Observable<IUserResponseModel>;

    @ViewChild(PasswordEditComponent)
    private readonly _passwordEditComponent!: PasswordEditComponent;

    constructor(
        private readonly _userManagerService: UserManagerService,
        private readonly _authService: IdentityService,
        private readonly _router: Router,
    ) {
        this.user$ = this._userManagerService.getUserInfo();
    }

    protected openDialogPassword(
        password: PolymorpheusContent<TuiDialogContext>,
    ): void {
        this._passwordEditComponent.openDialogPassword(password);
    }

    protected nextPageWithUpdateInfo(): void {
        this._router.navigate(['profile-edit']);
    }

    protected logoutUser(): void {
        this._authService.logoutUser();
        this._router.navigate(['welcome']);
    }
}
