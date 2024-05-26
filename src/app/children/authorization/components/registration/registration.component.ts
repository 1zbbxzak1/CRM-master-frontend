import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {fullNameValidator, phoneNumberValidator} from "../../../../validators/auth.validator";
import {IRegistrationRequestModel} from "../../../../data/request-models/auth/IRegistration.request-model";
import {AuthBaseComponent} from "../../../services/auth/auth-base-component";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrl: '../../../styles/dialog-styles.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent extends AuthBaseComponent {

    constructor() {
        super(new FormGroup({
            fullName: new FormControl("", [Validators.required, fullNameValidator()]),
            email: new FormControl("", [Validators.required, Validators.email]),
            phoneNumber: new FormControl("", [Validators.required, phoneNumberValidator()]),
            password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
        }));
    }

    protected registrationNewUser(): void {
        const fullName: string = this.formAuth.get('fullName')?.value;
        const email: string = this.formAuth.get('email')?.value;
        const phone: string = this.formAuth.get('phoneNumber')?.value;
        const password: string = this.formAuth.get('password')?.value;
        const vkLink: string = "";
        const telegramLink: string = "";

        if (email && password) {
            const user: IRegistrationRequestModel = {email, password, fullName, phone, vkLink, telegramLink};

            this.authUser(this._identityService.registerUser.bind(this._identityService), user);
        } else {
            console.error('Not all fields are filled in correctly');
        }
    }
}
