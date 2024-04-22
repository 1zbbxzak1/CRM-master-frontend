import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrl: './styles/welcome.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class WelcomeComponent {
    constructor(
        private _router: Router,
    ) {
    }
}
