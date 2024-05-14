import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
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

    constructor() {
    }

    protected openDialogRegistration(
        registration: PolymorpheusContent<TuiDialogContext>,
    ): void {
        this.registrationComponent.openDialogAuth(registration, "s");
    }
}
