import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {LoginComponent} from "../../../components/login/login.component";
import {RegistrationComponent} from "../../../components/registration/registration.component";
import {TuiDialogContext} from "@taiga-ui/core";
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './styles/header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    @ViewChild(LoginComponent) private readonly loginComponent!: LoginComponent;
    @ViewChild(RegistrationComponent) private readonly registrationComponent!: RegistrationComponent;

    constructor() {
    }

    protected openDialogLogIn(
        login: PolymorpheusContent<TuiDialogContext>,
    ): void {
        this.loginComponent.openDialogAuth(login, "s");
    }

    protected openDialogRegistration(
        registration: PolymorpheusContent<TuiDialogContext>,
    ): void {
        this.registrationComponent.openDialogAuth(registration, "s");
    }
}
