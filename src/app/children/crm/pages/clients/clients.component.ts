import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['../../styles/crm-styles.css', './styles/clients.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsComponent {

}
