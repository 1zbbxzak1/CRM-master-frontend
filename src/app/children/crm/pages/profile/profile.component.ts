import {Component} from '@angular/core';
import {UserManagerService} from "../../../../data/services/user/user.manager.service";
import {IUserResponseModel} from '../../../../data/response-models/user/IUser.response-model';
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {IdentityService} from "../../../../data/services/auth/identity.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['../../styles/crm-styles.css', './styles/profile-styles.css']
})
export class ProfileComponent {
    public user$: Observable<IUserResponseModel>;

    constructor(
        private _userManagerService: UserManagerService,
        private _authService: IdentityService,
        private _router: Router,
    ) {
        this.user$ = this._userManagerService.getUserInfo();
    }

    protected nextPageWithUpdateInfo(): void {
        this._router.navigate(['profile-edit']);
    }

    protected logoutUser(): void {
        this._authService.logoutUser();

        this._router.navigate(['welcome'])
    }
}
