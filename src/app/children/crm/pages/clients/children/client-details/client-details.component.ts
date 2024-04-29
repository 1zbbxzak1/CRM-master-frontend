import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-client-details',
    templateUrl: './client-details.component.html',
    styleUrl: './styles/client-details.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientDetailsComponent {

}
