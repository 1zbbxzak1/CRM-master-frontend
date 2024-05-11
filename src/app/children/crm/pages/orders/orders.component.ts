import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";
import {TuiDialogContext} from "@taiga-ui/core";
import {SettingsComponent} from "./components/settings/settings.component";

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['../../styles/crm-styles.css', './styles/orders.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent implements OnInit {
    protected search: string = '';
    protected isSettingsClicked: boolean = false;

    protected states: { [key: string]: boolean } = {
        isAllOrders: false,
        isNewOrders: false,
        isProgressOrders: false,
        isDeliveryOrders: false,
        isArchiveOrders: false,
    };
    @ViewChild(SettingsComponent)
    private readonly _settingsComponent!: SettingsComponent;

    constructor(private readonly _router: Router) {
    }

    // TODO: фильтрация для поиска
    // get filteredOrders() {
    //     return this.search ?
    //         this.rows.filter(order => order.some(cell => cell.toLowerCase().includes(this.search.toLowerCase()))) :
    //         this.rows;
    // }

    ngOnInit(): void {
        const savedStates: string | null = localStorage.getItem('tabsStates');
        if (savedStates) {
            this.states = JSON.parse(savedStates);
        } else {
            this.toggleState('isAllOrders');
        }
    }

    protected openDialogSettings(
        settings: PolymorpheusContent<TuiDialogContext>,
    ) {
        this.isSettingsClicked = !this.isSettingsClicked;
        this._settingsComponent.openDialogSettings(settings);
    }

    protected toggleState(stateName: string): void {
        const currentState: boolean = this.states[stateName];
        if (currentState) {
            return;
        }
        for (const key in this.states) {
            if (Object.prototype.hasOwnProperty.call(this.states, key)) {
                if (key !== stateName) {
                    this.states[key] = false;
                }
            }
        }
        this.states[stateName] = true;
        localStorage.setItem('tabsStates', JSON.stringify(this.states));

        if (stateName === 'isAllOrders') {
            this._router.navigate(['orders', 'all-orders']);
        } else if (stateName === 'isNewOrders') {
            this._router.navigate(['orders', 'new-orders']);
        } else if (stateName === 'isProgressOrders') {
            this._router.navigate(['orders', 'progress-orders']);
        } else if (stateName === 'isDeliveryOrders') {
            this._router.navigate(['orders', 'delivery-orders']);
        } else if (stateName === 'isArchiveOrders') {
            this._router.navigate(['orders', 'archive-orders']);
        }
    }
}
