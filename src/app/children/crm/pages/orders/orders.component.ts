import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['../../styles/crm-styles.css', './styles/orders.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent {

}
