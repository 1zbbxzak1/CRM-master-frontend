import {ChangeDetectionStrategy, Component} from '@angular/core';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './styles/header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    constructor() {
    }
}
