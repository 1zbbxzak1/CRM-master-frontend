import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {RegistrationComponent} from "../../components/registration/registration.component";
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";
import {TuiDialogContext} from "@taiga-ui/core";

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrl: './styles/welcome.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class WelcomeComponent {
    @ViewChild(RegistrationComponent) private readonly registrationComponent!: RegistrationComponent;

    constructor(
        private _router: Router,
    ) {
    }

    protected openDialogRegistration(
        registration: PolymorpheusContent<TuiDialogContext>,
    ): void {
        this.registrationComponent.openDialogRegistration(registration);
    }
}
