import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-crm-card',
    templateUrl: './crm-card.component.html',
    styleUrl: './styles/crm-card.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrmCardComponent {

}
