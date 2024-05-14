import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthBaseComponent} from "../../../services/auth/auth-base-component";
import {ILoginRequestModel} from "../../../../data/request-models/auth/ILogin.request-model";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: '../../../styles/dialog-styles.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends AuthBaseComponent {
    constructor() {
        super(new FormGroup({
            email: new FormControl("", [Validators.required, Validators.email]),
            password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
        }));
    }

    protected loginUser(): void {
        const email: string = this.formAuth.get('email')?.value;
        const password: string = this.formAuth.get('password')?.value;
        if (email && password) {
            const user: ILoginRequestModel = {email, password};

            this.authUser(this._identityService.loginUser.bind(this._identityService), user);
        } else {
            console.error('Not all fields are filled in correctly');
        }
    }
}
