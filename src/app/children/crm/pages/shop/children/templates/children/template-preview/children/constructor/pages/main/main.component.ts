import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrl: './styles/main.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {

}
