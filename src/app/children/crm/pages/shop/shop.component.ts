import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['../../styles/crm-styles.css', './styles/shop.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent {

}
