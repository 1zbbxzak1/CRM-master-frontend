import {Injectable, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Injectable()
export class StateBarService implements OnInit {
    protected statesTabs: { [key: string]: boolean } = {
        isAllOrders: false,
        isNewOrders: false,
        isProgressOrders: false,
        isDeliveryOrders: false,
        isArchiveOrders: false,
    };

    protected statesSidebar: { [key: string]: boolean } = {
        isOrdersClicked: false,
        isClientsClicked: false,
        isProductsClicked: false,
        isShopClicked: false,
        isProfileClicked: false
    };

    constructor(private readonly _router: Router) {
    }

    ngOnInit(): void {
        const savedStatesTabs: string | null = localStorage.getItem('tabsStates');
        if (savedStatesTabs) {
            this.statesTabs = JSON.parse(savedStatesTabs);
        } else {
            this.toggleStateTabs('isAllOrders');
            this._router.navigate(['crm/orders', 'all-orders']);
        }

        const savedStatesSidebar: string | null = localStorage.getItem('sidebarStates');
        if (savedStatesSidebar) {
            this.statesTabs = JSON.parse(savedStatesSidebar);
        } else {
            this.toggleStateSidebar('isOrdersClicked');
            this._router.navigate(['crm/orders', 'all-orders']);
        }
    }

    protected toggleStateTabs(stateName: string): void {
        const currentState: boolean = this.statesTabs[stateName];
        if (currentState) {
            return;
        }
        for (const key in this.statesTabs) {
            if (Object.prototype.hasOwnProperty.call(this.statesTabs, key)) {
                if (key !== stateName) {
                    this.statesTabs[key] = false;
                }
            }
        }
        this.statesTabs[stateName] = true;
        localStorage.setItem('tabsStates', JSON.stringify(this.statesTabs));

        if (stateName === 'isAllOrders') {
            this._router.navigate(['crm/orders', 'all-orders']);
        } else if (stateName === 'isNewOrders') {
            this._router.navigate(['crm/orders', 'new-orders']);
        } else if (stateName === 'isProgressOrders') {
            this._router.navigate(['crm/orders', 'progress-orders']);
        } else if (stateName === 'isDeliveryOrders') {
            this._router.navigate(['crm/orders', 'delivery-orders']);
        } else if (stateName === 'isArchiveOrders') {
            this._router.navigate(['crm/orders', 'archive-orders']);
        }
    }

    protected toggleStateSidebar(stateName: string): void {
        const currentState: boolean = this.statesSidebar[stateName];
        if (currentState) {
            return;
        }
        for (const key in this.statesSidebar) {
            if (Object.prototype.hasOwnProperty.call(this.statesSidebar, key)) {
                if (key !== stateName) {
                    this.statesSidebar[key] = false;
                }
            }
        }
        this.statesSidebar[stateName] = true;
        localStorage.setItem('sidebarStates', JSON.stringify(this.statesSidebar));
    }
}
