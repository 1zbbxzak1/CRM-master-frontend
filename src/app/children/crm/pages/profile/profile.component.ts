import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import {UserManagerService} from "../../../../data/services/user/user.manager.service";
import {IUserResponseModel} from '../../../../data/response-models/user/IUser.response-model';
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {IdentityService} from "../../../../data/services/auth/identity.service";
import {PasswordEditComponent} from "./children/password-edit/password-edit.component";
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";
import {TuiDialogContext} from "@taiga-ui/core";
import * as VKID from "@vkid/sdk";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['../../styles/crm-styles.css', './styles/profile-styles.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements AfterViewInit {
    protected user$: Observable<IUserResponseModel>;

    @ViewChild(PasswordEditComponent)
    private readonly _passwordEditComponent!: PasswordEditComponent;
    @ViewChild('vkIdButton')
    private readonly vkIdButton!: ElementRef;

    constructor(
        private readonly _userManagerService: UserManagerService,
        private readonly _authService: IdentityService,
        private readonly _router: Router,
    ) {
        this.user$ = this._userManagerService.getUserInfo();
    }

    ngAfterViewInit(): void {
        VKID.Config.set({
            app: 51908355,
            redirectUrl: 'http://localhost:4200',
        });

        const oneTap: VKID.OneTap = new VKID.OneTap();

        const container = this.vkIdButton.nativeElement;

        if (container) {
            oneTap.render({
                container,
                lang: 0,
                styles: {
                    width: 200,
                    borderRadius: 40,
                },
            });
            this._authService.externalAuthVk();
        }
    }

    protected openDialogPassword(
        password: PolymorpheusContent<TuiDialogContext>,
    ): void {
        this._passwordEditComponent.openDialogPassword(password);
    }

    protected nextPageWithUpdateInfo(): void {
        this._router.navigate(['crm/profile-edit']);
    }

    protected logoutUser(): void {
        this._authService.logoutUser();
        this._router.navigate(['']);
    }
}
