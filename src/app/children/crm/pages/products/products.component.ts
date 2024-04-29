import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['../../styles/crm-styles.css', './styles/products.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {

}
