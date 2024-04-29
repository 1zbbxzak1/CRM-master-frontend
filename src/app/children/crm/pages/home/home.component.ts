import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './styles/home.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

}
