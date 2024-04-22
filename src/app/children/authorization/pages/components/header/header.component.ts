import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {LoginComponent} from "../../../components/login/login.component";
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

    constructor() {
    }

    protected openDialogLogIn(
        login: PolymorpheusContent<TuiDialogContext>,
    ): void {
        this.loginComponent.openDialogLogIn(login);
    }
}
